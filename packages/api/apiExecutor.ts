/* eslint-disable no-underscore-dangle,@typescript-eslint/ban-types */
import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { API_URL } from '@asdfq/constants'
import { getItemAsync, removeItemAsync, setItemAsync, StorageKey } from '@asdfq/utils/asyncStorage'

export enum API_VERSION {
  V1 = 'v1',
}

class ApiExecutor {
  static singleton: ApiExecutor
  token: string | null
  client: AxiosInstance

  constructor() {
    ApiExecutor.singleton = this

    getItemAsync(StorageKey.TOKEN).then((res) => {
      this.token = res || null
    })
    this.client = axios.create({
      baseURL: API_URL,
      withCredentials: true,
    })

    this.client.interceptors.request.use(
      (config) => {
        if (!config?.headers?.Authorization) {
          const newConfig = {
            headers: {},
            ...config,
          }
          newConfig.headers.Authorization = `Bearer ${this.token}`

          return newConfig
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.request?.responseURL && !error.response.request.responseURL.endsWith('login')) {
          console.log('axios response error', 'login')
        }
        return Promise.reject(error)
      },
    )
  }

  setToken(token) {
    this.token = token
    setItemAsync(StorageKey.TOKEN, token)
  }

  removeToken() {
    this.token = null
    removeItemAsync(StorageKey.TOKEN)
  }

  get({ url, params = {}, version, config }: GetParam): Promise<AxiosResponse<any>> {
    return this._request({ url, method: 'get', params, version, config } as RequestParam)
  }

  post({ url, body, version, config }: PostPutPatchParam): Promise<AxiosResponse<any>> {
    return this._request({ url, method: 'post', body, version, config } as RequestParam)
  }

  patch({ url, body, version, config }: PostPutPatchParam): Promise<AxiosResponse<any>> {
    return this._request({ url, method: 'patch', body, version, config } as RequestParam)
  }

  put({ url, body, version, config }: PostPutPatchParam): Promise<AxiosResponse<any>> {
    return this._request({ url, method: 'put', body, version, config } as RequestParam)
  }

  delete({ url, body, version, config }: PostPutPatchParam): Promise<AxiosResponse<any>> {
    return this._request({ url, method: 'delete', body, version, config } as RequestParam)
  }

  _request({ url, method, params, body, version = API_VERSION.V1, config = undefined }: RequestParam): Promise<any> {
    let bodyParams = {}
    if (params) bodyParams = params
    if (body) bodyParams = body

    return this.client[method](`/${version}/${url}`, bodyParams, config)
      .then(
        (response) =>
          // console.log(url, method, params, body, response)
          response,
      )
      .then(({ data }) => data)
  }
}

type GetParam = {
  url: string
  params?: any
  version?: API_VERSION
  config?: any
}
type PostPutPatchParam = {
  url: string
  body?: any
  version?: API_VERSION
  config?: any
}

type RequestParam = {
  url: string
  method: 'get' | 'post' | 'patch' | 'put' | 'delete'
  params: any
  body?: any
  version?: API_VERSION
  config?: any
}

export default ApiExecutor
