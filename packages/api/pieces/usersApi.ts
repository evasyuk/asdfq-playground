import ApiExecutor, { API_VERSION } from '@asdfq/api/apiExecutor'

export class UsersApi {
  apiClient: ApiExecutor

  constructor(apiClient: ApiExecutor) {
    this.apiClient = apiClient
  }

  login(data) {
    return this.apiClient
      .post({ url: 'session/login', body: data, version: API_VERSION.V1 })
      .then((response) => response.data)
  }

  getMyUser() {
    return this.apiClient.get({ url: 'user/me', version: API_VERSION.V1 }).then((response) => response.data)
  }
}
