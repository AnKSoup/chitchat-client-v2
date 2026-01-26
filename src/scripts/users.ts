import router from '@/router'
import { call } from './api-calls'
import {
  CreateLocalKeyValue,
  CreateLocalObject,
  DeleteLocalObject,
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
  if (result.success && 'user_name' in form) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  let first_login = false

  //If it succeeds => create it in local storage then redirects to conversations
  //Else return the error to the user
  if (result.success && 'user_email' in form) {
    //CHECK IF USER ALREADY EXISTS!!!!!
    if (GetLocalValue(form.user_email as string) == null) {
      first_login = true
    }
    if (first_login) {
      //Creates the user in local storage
      CreateLocalObject(form.user_email as string, CreateUser(undefined, result.content.user_token))
    } else {
      //Regenerates token
      const old = GetLocalObject(form.user_email as string)
      CreateLocalObject(
        form.user_email as string,
        UpdateUser(old, { user_token: result.content.user_token }),
      )
    }

    //Sets said user as the main account
    UseCurrentUser(form.user_email as string)

    if (first_login) {
      //Sets the id of the user1
      const current_user = GetCurrentUser()
      CreateLocalObject(
        form.user_email as string,
        UpdateUser(current_user, { user_id: await GetUserId() }),
      )
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
  //then updates it to the db
  await UploadPbK()
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
  } else {
    alert("Couldn't logout. Please try again.")
  }
}

export function SoftLogout() {
  const current_email = GetCurrentUserEmail()
  const current_user = GetCurrentUser()
  CreateLocalObject(current_email as string, UpdateUser(current_user, { user_token: undefined }))
  RemoveCurrentUser()
  router.push('/Login')
}

export async function SearchForUser(query: string) {
  //Returns a list of users like "query"
  const result = await call('GET', userRoute + '/search/' + query)
  if (result.success) {
    //This just sorts it by name
    const content = result.content
    content.sort((a: { user_name: string }, b: { user_name: string }) =>
      a.user_name.localeCompare(b.user_name),
    )
    return { success: true, content: content }
  } else {
    return { success: false, error: result.detail }
  }
}

export async function GetUserInfo(user_id: string) {
  const result = await call('GET', userRoute + '/' + user_id)
  if (!result.success) {
    return {
      image: '',
      name: 'No author...',
      gradientColor1: 'red',
      gradientColor2: '',
    }
  } else {
    return {
      image: '',
      name: result.content[0].user_name,
      gradientColor1: '',
      gradientColor2: '',
    }
  }
}

export async function GetMyInfo() {
  const current_user = GetCurrentUser()
  const result = await call('POST', userRoute + '/' + current_user.user_id, {
    user_token: current_user.user_token,
  })
  return result.content[0]
}

async function EditUser(user_id: number | string, user_token: string, user: object) {
  const result = await call('PUT', userRoute + '/' + user_id, { user_token: user_token, ...user })
  return result
}

export async function EditCurrentUser(user: object) {
  const current_user = GetCurrentUser()
  const old_email = GetCurrentUserEmail()
  const result = await EditUser(current_user.user_id, current_user.user_token, user)
  if (result.success && 'user_email' in user && old_email) {
    if (old_email != user.user_email) {
      //Copy content and change email : so far no need to edit other stuff
      CreateLocalObject(user.user_email as string, current_user)
      UseCurrentUser(user.user_email as string)
      DeleteLocalObject(old_email)
    }
  } else {
    return result.detail
  }
}

export async function UploadPbK() {
  const current_user = GetCurrentUser()
  const result = await EditUser(current_user.user_id, current_user.user_token, {
    user_public_key: current_user.publicKey,
  })
  return result
}

export async function ChangePass(new_user_password: string) {
  const current_user = GetCurrentUser()
  const result = await call('PUT', userRoute + '/change_pass/' + current_user.user_id, {
    user_token: current_user.user_token,
    user_password: new_user_password,
  })
  if (!result.success) {
    return result.detail
  }
}
