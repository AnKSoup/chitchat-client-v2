// #1- Get a blog:       GET     /blog/:blog_id                              //                                                                  RES: {blog}
// #2- Create a blog:    POST    /blog/:blog_id                              REQ: {user_token}                                                   //
// #3- Edit a blog:      PUT     /blog/:blog_id                              REQ: {user_token, blog_content}                                     //

import { call } from './api-calls'
import { GetCurrentUser } from './users'

const blogRoute = '/blog/'

export function IsUserOwnerOfBlog(blog_id: string) {
  const current_user = GetCurrentUser()
  return current_user.user_id == blog_id
}

export async function GetBlog(blog_id: string) {
  const result = await call('GET', blogRoute + blog_id)
  if (!result.success) {
    if (IsUserOwnerOfBlog(blog_id)) {
      const attempt = await CreateMyBlog()
      if (attempt.success) {
        return await GetBlog(blog_id)
      } else {
        return {
          ...result,
          content: "<h1>Blog couldn't be created</h1><p>" + attempt.detail + '</p>',
        }
      }
    }
    return { ...result, content: "<h1>Blog doesn't exist</h1><p>Error 404...</p>" }
  }
  const returnedBlog = { ...result, content: result.content[0].blog_content }
  return returnedBlog
}

export async function PostBlog() {
  const current_user = GetCurrentUser()
  const result = await call('POST', blogRoute + current_user.user_id, {
    user_token: current_user.user_token,
  })
  return result
}

export async function CreateMyBlog() {
  const result = await PostBlog()
  if (!result.success) {
    return result
  }
  return await UpdateBlog('<h1>Welcome to my blog!</h1>\n<p>My story is yet to be told...</p>')
}

export async function UpdateBlog(content: string) {
  const current_user = GetCurrentUser()
  const result = await call('PUT', blogRoute + current_user.user_id, {
    user_token: current_user.user_token,
    blog_content: content,
  })
  return result
}
