import router from '@/router'
import { call } from './api-calls'
import {
  CreateLocalKeyValue,
  CreateLocalObject,
  DeleteLocalValue,
  GetLocalObject,
  GetLocalValue,
} from './local-storage'
import { GenerateKeyPair } from './encryption'

const userRoute = '/user'

//Checks if a user is logged in
// => Redirects to conversation and sets a value in localstorage
export async function IsLoggedIn() {
  const result = await GetUserId()
  if (!isNaN(result)) {
    CreateLocalKeyValue('logged_in', 'true')
    router.push('Conversations')
  } else {
    CreateLocalKeyValue('logged_in', 'false')
  }
}

function CreateUser(user_id: number | undefined, user_token: string) {
  return {
    user_id: user_id,
    user_token: user_token,
  }
}

function UpdateUser(old: object, update: object) {
  return { ...old, ...update }
}

export function UseCurrentUser(email: string) {
  CreateLocalKeyValue('current_user', email)
}

export function GetCurrentUserEmail() {
  return GetLocalValue('current_user')
}

export function GetCurrentUser() {
  const current_user = GetLocalValue('current_user')
  if (current_user) {
    return GetLocalObject(current_user)
  }
}

export function RemoveCurrentUser() {
  DeleteLocalValue('current_user')
}

export async function SignInUser(form: object) {
  const result = await call('POST', userRoute, form)

  //If it succeeds => logs the user in
  //Else return the error to the user
  if (result.success) {
    const { user_name, ...newObject } = form //Ugly but needed

    // attempts to log in the newly signed user
    const login = await LogInUser(newObject)
    if (!login) {
      //If it fails redirect to login page
      router.push('Login')
    }
  } else {
    return result.detail
  }
}

export async function LogInUser(form: object) {
  const result = await call('POST', userRoute + '/login', form)

  //If it succeeds => create it in local storage then redirects to conversations
  //Else return the error to the user
  if (result.success && 'user_email' in form) {
    //Creates the user in local storage
    CreateLocalObject(form.user_email as string, CreateUser(undefined, result.content.user_token))
    //Sets said user as the main account
    UseCurrentUser(form.user_email as string)
    //Sets the id of the user
    const current_user = GetCurrentUser()
    CreateLocalObject(
      form.user_email as string,
      UpdateUser(current_user, { user_id: await GetUserId() }),
    )
    //Gen keys if necessary
    const check = await GetUserPvK()
    if (!check) {
      await GenerateKeysForCurrentUser()
    }

    CreateLocalKeyValue('logged_in', 'true')
    //Redirects to the conversations
    router.push('Conversations')
    return result.success
  } else {
    return result.detail
  }
}

//Get the user id with a function
export async function GetUserId() {
  const current_user = GetCurrentUser()
  if (current_user) {
    const result = await call('POST', userRoute + '/get_id', {
      user_token: current_user.user_token,
    })
    if (result.success) {
      return result.content.user_id
    }
  }
}

export async function GenerateKeysForCurrentUser() {
  const current_user = GetCurrentUser()
  const current_email = GetCurrentUserEmail()
  const keys = await GenerateKeyPair()
  CreateLocalObject(current_email as string, UpdateUser(current_user, keys))
}

//Get the user keys !
export async function GetUserPvK() {
  const current_user = GetCurrentUser()
  if (current_user) {
    return current_user.privateKey
  }
}

export async function GetUserPbK() {
  const current_user = GetCurrentUser()
  if (current_user) {
    return current_user.publicKey
  }
}

export async function LogOutUser(user_token: string) {
  const result = await call('POST', userRoute + '/logout', {
    user_token: user_token,
  })
  //if it succeeds: remove token and current user
  if (result.success) {
    const current_email = GetCurrentUserEmail()
    const current_user = GetCurrentUser()
    CreateLocalObject(current_email as string, UpdateUser(current_user, { user_token: undefined }))
    RemoveCurrentUser()
    router.push('/')
  }
  //Else do something ??
}
