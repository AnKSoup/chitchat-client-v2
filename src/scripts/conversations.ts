import router from '@/router'
import { call } from './api-calls'
import { GetCurrentUser, GetUserPvK } from './users'
import { decryptKey, encryptKey, retrieveKeyAndIV, retrievePbKOf } from './encryption'

const ConversationRoute = '/conversation'
const MemberRoute = '/group_member'

// Get all the conversations of the current user if they exists
export async function GetConversations() {
  const current_user = GetCurrentUser()
  if (current_user.user_id) {
    const result = await call('GET', MemberRoute + '/conversation_of/' + current_user.user_id)
    if (result.success) {
      return result.content
    } else {
      return [
        {
          conversation_name: 'No conversations',
          conversation_id: '',
          gradientColor1: 'red',
        },
      ]
    }
  }
}

export async function CreateConversation(conversation_name: string) {
  const current_user = GetCurrentUser()
  //Create the conversation
  const result = await call('POST', ConversationRoute, {
    owner_id: current_user.user_id,
    conversation_name: conversation_name,
  })

  //Store the keys :
  //add yourself to it
  if (result.success) {
    const check = [
      current_user.user_token,
      current_user.user_id,
      result.content.rowid,
      result.content.key,
      result.content.iv,
      current_user.publicKey,
    ]
    const checkProperty = [
      'Token of the user',
      'Id of the user',
      'Id of the conversation',
      'Key of the conversation',
      'Iv of the conversation',
      'Public key of the user',
    ]
    for (let i = 0; i < check.length; i++) {
      if (!check[i]) {
        return checkProperty[i] + ' is missing.'
      }
    }

    const member = await AddMember(
      current_user.user_token,
      current_user.user_id,
      result.content.rowid,
      result.content.key,
      result.content.iv,
      current_user.publicKey,
    )
    if (member) return member
    router.push('/Conversations/' + result.content.rowid)
  } else {
    return result.detail
  }
}

export async function GetAllMembersOf(conversation_id: string) {
  const result = await call('GET', ConversationRoute + '/members_of/' + conversation_id)
  if (result.success) {
    return result.content
  } else {
    return [
      {
        user_name: 'No Users',
        gradientColor1: 'red',
      },
    ]
  }
}

async function AddMember(
  user_token: string,
  user_id: string,
  conversation_id: string,
  decrypt_key: string,
  decrypt_iv: string,
  public_key: string,
) {
  const key = encryptKey(public_key, decrypt_key) as object
  const iv = encryptKey(public_key, decrypt_iv) as object

  if ('key' in key && 'key' in iv) {
    const member = {
      user_token: user_token,
      user_id: user_id,
      conversation_id: conversation_id,
      decrypt_key: key.key,
      decrypt_iv: iv.key,
    }
    const result = await call('POST', MemberRoute, member)
    if (!result.success) {
      return result.detail
    }
  } else if ('error' in key) {
    return key.error
  } else if ('error' in iv) {
    return iv.error
  } else return 'Something went wrong with the key generation.'
}

export async function AddOtherMember(conversation_id: string, user_id: number) {
  //Getting keys
  const current_user = GetCurrentUser()
  const key_iv = await retrieveKeyAndIV(current_user.user_id, conversation_id)
  const privateKey = await GetUserPvK()
  //Decrypting symmetric keys
  const decrypted_key_iv = {
    key: decryptKey(privateKey, key_iv.decrypt_key).key,
    iv: decryptKey(privateKey, key_iv.decrypt_iv).key,
  }
  //Encrypting key for the new user
  const user_public_key = await retrievePbKOf(user_id)
  if (!user_public_key) {
    return "User you are trying to add doesn't possess any keys for encryption :("
  }
  //Adding it
  const result = await AddMember(
    current_user.user_token,
    user_id.toString(),
    conversation_id,
    decrypted_key_iv.key,
    decrypted_key_iv.iv,
    user_public_key,
  )
  return result
}

export async function IsUserOwner(conversation_id: string) {
  if (conversation_id) {
    const current_user = GetCurrentUser()
    const result = await call('GET', ConversationRoute + '/' + conversation_id)
    if (result.success && result.content[0].owner_id == current_user.user_id) {
      return true
    } else {
      return false
    }
  } else return false
}

async function RemoveMember(user_id: string, conversation_id: string) {
  const current_user = GetCurrentUser()
  const result = await call('PUT', MemberRoute + '/leave/' + conversation_id, {
    user_id: user_id,
    user_token: current_user.user_token,
  })
  return result
}

export async function LeaveConversation(conversation_id: string) {
  if (
    confirm(
      'You are about to leave this conversation.\nYOU WILL NOT BE ABLE TO JOIN AGAIN UNLESS THE OWNER DECIDES OTHERWISE.',
    )
  ) {
    const current_user = GetCurrentUser()
    const result = await RemoveMember(current_user.user_id, conversation_id)
    if (result.success) {
      router.push('/Conversations')
    } else {
      alert(result.detail)
    }
  }
}
