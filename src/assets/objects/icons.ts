// This is to hold data for every icons:
// leave gradient empty for user gradient

// Works only here for some reasons, isolating it in another script cause initialization errors because it is called before getting initialized???
import router from '@/router'
import { GetCurrentUser, LogOutUser } from '@/scripts/users'

export const homeIcon = {
  iconImg: 'blog',
  iconText: 'Home',
  gradientColor1: '',
  gradientColor2: '',
  action: () => {
    router.push('/')
  },
}

export const profileIcon = {
  iconImg: 'user',
  iconText: 'Profile',
  gradientColor1: '',
  gradientColor2: '',
  action: () => {
    router.push('/Profile')
  },
}

export const chatIcon = {
  iconImg: 'chat',
  iconText: 'Chat',
  gradientColor1: '',
  gradientColor2: '',
  action: () => {
    router.push('/Conversations')
  },
}

export const blogIcon = {
  iconImg: 'blog',
  iconText: 'Blog',
  gradientColor1: '',
  gradientColor2: '',
  action: () => {
    router.push('/Blogs')
  },
}

export const loginIcon = {
  iconImg: 'log_in',
  iconText: 'Log In',
  gradientColor1: '',
  gradientColor2: '',
  action: () => {
    router.push('Login')
  },
}

export const logoutIcon = {
  iconImg: 'log_out',
  iconText: 'Log Out',
  gradientColor1: '',
  gradientColor2: '',
  action: () => {
    const current_user = GetCurrentUser()
    LogOutUser(current_user.user_token)
  },
}

export const signinIcon = {
  iconImg: 'sign_in',
  iconText: 'Sign In',
  gradientColor1: '',
  gradientColor2: '',
  action: () => {
    router.push('Signin')
  },
}

export const createConvIcon = {
  iconImg: 'create_conversation',
  iconText: 'New Conv.',
  gradientColor1: '',
  gradientColor2: '',
}

// Delete conv is a button in settings for security

export const addUserIcon = {
  iconImg: 'add_user',
  iconText: 'Add User',
  gradientColor1: '',
  gradientColor2: '',
}

export const remUserIcon = {
  iconImg: 'remove_user',
  iconText: 'Rem. User',
  gradientColor1: '',
  gradientColor2: '',
}

export const convSettingsIcon = {
  iconImg: 'settings',
  iconText: 'Edit Conv.',
  gradientColor1: '',
  gradientColor2: '',
}

export const blogSettingsIcon = {
  iconImg: 'settings',
  iconText: 'Edit Blog',
  gradientColor1: '',
  gradientColor2: '',
}

export const respondIcon = {
  iconImg: 'respond',
  iconText: 'Respond',
  gradientColor1: '',
  gradientColor2: '',
}

export const searchIcon = {
  iconImg: 'search',
  iconText: 'Search',
  gradientColor1: '',
  gradientColor2: '',
}
