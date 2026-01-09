// Prevents unauthed users to go to certain routes
import { GetLocalValue } from '@/scripts/local-storage'

const guardedRoutes = ['/Conversations', '/Blogs']

function isAuthed() {
  const loggedIn = GetLocalValue('logged_in')
  if (loggedIn == 'true') {
    return true
  } else return false
}

export function CanUserAccess(to: string) {
  if (guardedRoutes.includes(to) && !isAuthed()) {
    return false
  } else return true
}
