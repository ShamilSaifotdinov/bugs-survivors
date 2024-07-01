import queryString from '../helpers/queryStringify'

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  headers?: HeadersInit
  credentials?: RequestCredentials
  data?: Record<string, unknown> | FormData
}

type FetchMethod = <R = unknown>(url: string, options?: Options) => Promise<R>

const fetchApi = (baseUrl?: string) => {
  const request = async (
    url: string,
    options: Options & { method: METHODS }
  ) => {
    const { method, credentials = 'include', data } = options

    const requestOptions: RequestInit = {
      method,
      credentials,
    }

    if (data) {
      if (data instanceof FormData) {
        requestOptions.body = data
      } else {
        requestOptions.body = JSON.stringify(data)
        requestOptions.headers = {
          'Content-Type': 'application/json',
        }
      }
    }

    const response = await fetch(baseUrl + url, requestOptions)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.reason)
    }
    const text = await response.text()
    try {
      const json = JSON.parse(text)
      return json
    } catch {
      return text
    }
  }

  const get: FetchMethod = (url, options = {}) => {
    const finalUrl = options.data ? url + queryString(options.data) : url
    return request(finalUrl, {
      ...options,
      data: undefined,
      method: METHODS.GET,
    })
  }

  const post: FetchMethod = (url, options = {}) =>
    request(url, { ...options, method: METHODS.POST })

  const put: FetchMethod = (url, options = {}) =>
    request(url, { ...options, method: METHODS.PUT })

  const deleteFetch: FetchMethod = (url, options = {}) =>
    request(url, { ...options, method: METHODS.DELETE })

  return { get, post, put, delete: deleteFetch }
}

export default fetchApi
