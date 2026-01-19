// #2- comms from blog:  POST    /comment/of/:blog_id                        REQ: {limit, offset}                                                RES: {comments}
// #3- Write a comment:  POST    /comment/:blog_id                           REQ: {user_id, user_token, comment_content, in_response_to}         //

import { call } from './api-calls'
import { GetCurrentUser } from './users'

const commentRoute = '/comment/'

async function GetComments(blog_id: string) {
  //Could be loaded partially but im out of time sadly
  const result = await call('POST', commentRoute + 'of/' + blog_id, { limit: 0, offset: 0 })
  return result.content //Either array of object/undefined
}

//Get all the responses recursively
function RetrieveAllResponses(comments: Array<object>, comment_id: string) {
  const responses = comments.filter((comment) => comment.in_response_to == comment_id)

  //initialize my result
  const result = responses

  //Recursively call every children and push the deconstructed result into the parent result
  responses.forEach((child) => {
    result.push(...RetrieveAllResponses(comments, child.comment_id))
  })

  return result
}

//Get content and preview from an in response to
function GetPreview(comments: Array<object>, in_response_to: string) {
  return comments.find((comment) => comment.comment_id == in_response_to)
}

//Formats the retrieved comments
export async function FormatComments(blog_id: string) {
  const result = (await GetComments(blog_id)) as Array<object>

  const formatted_comments = []
  if (result) {
    for (let i = 0; i < result.length; i++) {
      if (result[i].in_response_to) {
        continue // Skip responses
      }
      // Get possible responses
      const responses = RetrieveAllResponses(result, result[i].comment_id)

      //Formats the comment
      const comment = [
        {
          image: '',
          username: result[i].user_name,
          usernameResponse: '',
          responsePreview: '',
          date: result[i].comment_created_at,
          content: result[i].comment_content,
          id: result[i].comment_id,
          gradientColor1: '',
          gradientColor2: '',
          gradientColor3: '',
          gradientColor4: '',
        },
      ]
      //Inserts responses
      if (responses) {
        for (let j = 0; j < responses.length; j++) {
          const preview = GetPreview(result, responses[j].in_response_to)

          comment.push({
            image: '',
            username: responses[j].user_name,
            usernameResponse: preview.user_name,
            responsePreview: preview.comment_content,
            date: responses[j].comment_created_at,
            content: responses[j].comment_content,
            id: responses[j].comment_id,
            gradientColor1: '',
            gradientColor2: '',
            gradientColor3: '',
            gradientColor4: '',
          })
        }
        comment.sort((a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date))
      }
      formatted_comments.push(comment)
    }
    return formatted_comments
  } else {
    return [
      [
        {
          image: '',
          username: '',
          usernameResponse: '',
          responsePreview: '',
          date: '',
          content: 'No comments...',
          id: '',
          gradientColor1: 'red',
          gradientColor2: '',
          gradientColor3: '',
          gradientColor4: '',
        },
      ],
    ]
  }
}

export async function PostComment(
  blog_id: string,
  comment_content: string,
  in_response_to?: string,
) {
  const current_user = GetCurrentUser()
  const response = in_response_to ? in_response_to : 0
  const result = await call('POST', commentRoute + blog_id, {
    user_id: current_user.user_id,
    user_token: current_user.user_token,
    comment_content: comment_content,
    in_response_to: response,
  })
  return result
}
