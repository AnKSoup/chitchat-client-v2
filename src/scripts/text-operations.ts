//if "text" >n char => "tex..."
export function stripText(limit: number, text: string) {
  if (text.length > limit) {
    return `${text.substring(0, limit - 3)}...`
  } else return text
}
