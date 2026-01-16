import { call } from './api-calls'
import { decryptKey, decryptMessage, encryptMessage, retrieveKeyAndIV } from './encryption'
import { GetCurrentUser, GetUserPvK } from './users'

const MessageRoute = '/message'

//Get messages as a raw array of object
async function GetMessages(conversation_id: string, message_count: number, message_offset: number) {
  // #1- Get all messages: POST /message/get/:conversation_id REQ: {user_token, user_id, message_count, message_offset}
  const current_user = GetCurrentUser()
  const result = await call('POST', MessageRoute + '/get/' + conversation_id, {
    user_token: current_user.user_token,
    user_id: current_user.user_id,
    message_count: message_count,
    message_offset: message_offset,
  })
  // this will return an array of messages or undefined
  return result.content
}

//Pass in an array that gets updated with messages
//This is to get messages in batches
async function ConcatMessages(
  conversation_id: string,
  message_count: number,
  message_offset: number,
  array: Array<object>,
  first: boolean,
) {
  const newMessages = await GetMessages(conversation_id, message_count, message_offset)
  //Will return false when newMessages is undefined => to check for loop breaking

  //To get rid of the "loading..."
  if (array.length == 1 && first) {
    array.pop()
  }

  if (newMessages) {
    for (let i = 0; i < newMessages.length; i++) {
      const formatted_message = await FormatMessage(newMessages[i], conversation_id, array)
      if (typeof formatted_message) {
        array.unshift(formatted_message as object)
      }
    }
    return true
  } else if (array.length == 0) {
    //If its the first time
    array.push({ messages: [{ text: 'No message found!' }], gradientColor1: 'red' })
  } else {
    return false
  }
}

export async function GetAllTheMessages(
  conversation_id: string,
  amount: number,
  array: Array<object>,
) {
  let first = true
  let message_offset = 0
  //Loops until there is no more messages
  while (true) {
    const check = await ConcatMessages(conversation_id, amount, message_offset, array, first)
    if (!check) {
      return
    }
    //Offsets the next batch
    message_offset += amount
    first = false
  }
}

// Send message
export async function SendMessage(
  conversation_id: string,
  message_content: string,
  in_response_to: number = 0,
) {
  //Getting keys
  const current_user = GetCurrentUser()
  //those should be cached temporarily
  const key_iv = await retrieveKeyAndIV(current_user.user_id, conversation_id)
  const privateKey = await GetUserPvK()
  //Decrypting symmetric keys
  const decrypted_key_iv = {
    key: decryptKey(privateKey, key_iv.decrypt_key).key,
    iv: decryptKey(privateKey, key_iv.decrypt_iv).key,
  }
  //Encrypting the message
  const message = encryptMessage(
    message_content,
    decrypted_key_iv.key,
    decrypted_key_iv.iv,
  ) as object

  if ('message' in message && 'tag' in message) {
    const result = await call('POST', MessageRoute + '/' + conversation_id, {
      user_token: current_user.user_token,
      user_id: current_user.user_id,
      message_content: message.message,
      message_tag: message.tag,
      in_response_to: in_response_to,
    })
    // returns result
    return result
  } else return { success: false, detail: "Couldn't encrypt your message." }
}

//Check if the messages are the same to iterate at the end
//Append messages on the bottom
//Todo later when there is a way to check new messages inside a conversation

//Format messages
export async function FormatMessage(
  message: object,
  conversation_id: string,
  array: Array<object>,
) {
  //Getting keys
  const current_user = GetCurrentUser()
  //those should be cached temporarily
  const key_iv = await retrieveKeyAndIV(current_user.user_id, conversation_id)
  const privateKey = await GetUserPvK()
  //Decrypting symmetric keys
  const decrypted_key_iv = {
    key: decryptKey(privateKey, key_iv.decrypt_key).key,
    iv: decryptKey(privateKey, key_iv.decrypt_iv).key,
  }

  if (
    'message_id' in message &&
    'message_content' in message &&
    'message_tag' in message &&
    'message_sent_at' in message &&
    'user_id' in message
  ) {
    const decrypted_message = decryptMessage(
      message.message_content as string,
      decrypted_key_iv.key,
      decrypted_key_iv.iv,
      message.message_tag as string,
    ) as object

    if ('message' in decrypted_message) {
      const messages = [
        {
          text: decrypted_message.message,
          time: message.message_sent_at,
          id: message.message_id,
        },
      ]
      //Check if previous message is of same user
      //If so => delete previous message and fusions it with the current one
      // console.log(array)
      const previous_message = array[0]
      if (
        previous_message &&
        'user_id' in previous_message &&
        'messages' in previous_message &&
        previous_message.user_id == message.user_id
      ) {
        array.shift()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages.push(...(previous_message.messages as any)) //Oh lord this is so ugly
      }
      const result = {
        messages: messages,
        image: '', // none yet
        orientation: '', // omissible
        side: '',
        gradientColor1: '', // none yet
        gradientColor2: '', // none yet
        user_id: message.user_id,
      }
      // to check if modified
      if ('message_modified_at' in message && message.message_modified_at && result.messages[0]) {
        result.messages[0].time = message.message_modified_at
      }
      // to check for side and orientation
      if (current_user.user_id == message.user_id) {
        result.side = 'left'
      } else {
        result.side = 'right'
      }
      return result
    } else {
      return null
    }
  } else {
    return null
  }
}
