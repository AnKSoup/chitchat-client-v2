export function CreateLocalKeyValue(key: string, value: string) {
  localStorage.setItem(key, value)
}
export function GetLocalValue(key: string) {
  return localStorage.getItem(key)
}
export function DeleteLocalValue(key: string) {
  return localStorage.removeItem(key)
}

export function CreateLocalObject(key: string, object: object) {
  localStorage.setItem(key, JSON.stringify(object))
}

export function GetLocalObject(key: string) {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
}

export function DeleteLocalObject(key: string) {
  localStorage.removeItem(key)
}
