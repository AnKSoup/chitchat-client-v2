// Hosts functions to call the api
const baseUrl = import.meta.env.VITE_SERVER_ADDRESS
console.log(baseUrl)

//Calls the api and returns the iro as a JSON
export async function call(method: string, url: string, body?: object) {
  //Gather options:
  const params = {
    method: method,
    headers: {
      // This is needed for the express app to accept the request
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  //Send a request
  const response = await fetch(baseUrl + url, params)
  return await response.json()
}
