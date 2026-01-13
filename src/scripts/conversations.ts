import router from '@/router'
import { call } from './api-calls'
import { GetCurrentUser } from './users'
import { encryptKey } from './encryption'

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

export async function AddMember(
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
      decrypt_key: key,
      decrypt_iv: iv,
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
