/* eslint-disable prettier/prettier */
import { ApiClient } from '@asdfq/api'
import { AnyAction } from 'redux'
import { Dispatch } from 'react'
import { Store } from '@reduxjs/toolkit'

export default function apiMiddleware(api: ApiClient) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (store: Store) =>
    (next: Dispatch<AnyAction>): ((AnyAction) => void) =>
      (action: AnyAction): void => {
        if (action.type !== 'NETWORK') {
          return next(action)
        }

        const payload = action?.payload

        if (!payload?.types) {
          throw Error('developer\'s error: api request missing "types"')
        }
        if (!payload?.promise) {
          throw Error('developer\'s error: api request missing "promise"')
        }

        const { types, promise, ...rest } = payload

        const { REQUEST, SUCCESS, FAILURE } = types

        next({ ...rest, type: REQUEST })

        return promise(api).then(
          (data) => next({ ...rest, data, type: SUCCESS }),
          (error) => next({
            ...rest,
            error: error?.response?.data ? error.response.data.message : error.message,
            fields: error?.response?.data?.fields,
            type: FAILURE,
          }),
        )
      }
}
