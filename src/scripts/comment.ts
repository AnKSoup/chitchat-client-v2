import { call } from './api-calls'
import { GetCurrentUser } from './users'

const commentRoute = '/comment/'

async function GetComments(blog_id: string) {
  //Could be loaded partially but im out of time sadly
  const result = await call('POST', commentRoute + 'of/' + blog_id, { limit: 0, offset: 0 })
  return result.content //Either array of object/undefined
}

//Get all the responses recursively
function RetrieveAllResponses(
  comments: Array<{ in_response_to: string; comment_id: string }>,
  comment_id: string,
) {
  const responses = comments.filter((comment) => comment.in_response_to == comment_id)

  //initialize my result
  const result = responses

  //Recursively call every children and push the deconstructed result into the parent result
  responses.forEach((child: { comment_id: string }) => {
    result.push(...RetrieveAllResponses(comments, child.comment_id))
  })

  return result
}

//Get content and preview from an in response to
function GetPreview(comments: Array<{ comment_id: string }>, in_response_to: string) {
  return comments.find((comment) => comment.comment_id == in_response_to)
}

//Formats the retrieved comments
export async function FormatComments(blog_id: string) {
  const result = await GetComments(blog_id)

  const formatted_comments = []
  if (result) {
    for (let i = 0; i < result.length; i++) {
      const current_comment = result[i]
      if (
        current_comment &&
        'comment_id' in current_comment &&
        'user_name' in current_comment &&
        'comment_created_at' in current_comment &&
        'comment_content' in current_comment &&
        'in_response_to' in current_comment
      ) {
        if (current_comment.in_response_to) {
          continue // Skip responses
        }
        // Get possible responses
        const responses = RetrieveAllResponses(result, current_comment.comment_id as string)

        //Formats the comment
        const comment = [
          {
            image: '',
            username: current_comment.user_name as string,
            usernameResponse: '',
            responsePreview: '',
            date: current_comment.comment_created_at as string,
            content: current_comment.comment_content as string,
            id: current_comment.comment_id as string,
            gradientColor1: '',
            gradientColor2: '',
            gradientColor3: '',
            gradientColor4: '',
          },
        ]
        //Inserts responses
        if (responses) {
          for (let j = 0; j < responses.length; j++) {
            const current_response = responses[j]

            if (
              current_response &&
              'comment_id' in current_response &&
              'user_name' in current_response &&
              'comment_created_at' in current_response &&
              'comment_content' in current_response &&
              'in_response_to' in current_response
            ) {
              const preview = GetPreview(result, current_response.in_response_to as string)

              if (preview && 'user_name' in preview && 'comment_content' in preview)
                comment.push({
                  image: '',
                  username: current_response.user_name as string,
                  usernameResponse: preview.user_name as string,
                  responsePreview: preview.comment_content as string,
                  date: current_response.comment_created_at as string,
                  content: current_response.comment_content as string,
                  id: current_response.comment_id as string,
                  gradientColor1: '',
                  gradientColor2: '',
                  gradientColor3: '',
                  gradientColor4: '',
                })
            }
          }
          comment.sort((a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date))
        }
        formatted_comments.push(comment)
      }
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
