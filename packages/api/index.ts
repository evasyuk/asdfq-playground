import { UsersApi } from './pieces/usersApi'
import ApiExecutor from '@asdfq/api/apiExecutor'

const apiExecutor = new ApiExecutor()

export type ApiClient = {
  users: UsersApi
}

export const apiClient = {
  users: new UsersApi(apiExecutor),
}
