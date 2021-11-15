import { LoadableState } from '@asdfq/state'
import { ActionReducerMapBuilder, Reducer } from '@reduxjs/toolkit'
import { ApiClient } from '@asdfq/api/index'

type NetworkRequestActionType = {
  type: string
  payload: {
    types: {
      REQUEST: string
      SUCCESS: string
      FAILURE: string
    }
    promise: (ApiClient) => Promise<void>
    callbacks?: {
      onSuccess?: () => void
      onFailure?: () => void
    }
    data?: any
  }
}

type NetworkRequestActionCreatorType<Type> = {
  getAction: () => NetworkRequestActionType
  reduce: (builder: ActionReducerMapBuilder<Type>) => void
}

export const getNetworkRequest = <Type extends LoadableState>(
  type: string,
  promise: (ApiClient) => Promise<void>,
  reducerSuccess?: Reducer<Type>,
  reducerFailure?: Reducer<Type>,
): NetworkRequestActionCreatorType<Type> => {
  const types = {
    REQUEST: `${type}/network/login_started`,
    SUCCESS: `${type}/network/login_success`,
    FAILURE: `${type}/network/login_failure`,
  }

  return {
    getAction: ({ data = undefined, callbacks = undefined } = { data: undefined, callbacks: undefined }) => ({
      type: 'NETWORK',
      payload: {
        types,
        promise,
        callbacks,
        data,
      },
    }),
    reduce: (builder: ActionReducerMapBuilder<Type>) => {
      builder.addCase(types.REQUEST, (state) => {
        state.loading = true
      })
      builder.addCase(types.SUCCESS, (state, action) => {
        state.loading = false

        if (reducerSuccess) {
          reducerSuccess(state as Type, action)
        }
      })
      builder.addCase(types.FAILURE, (state, action) => {
        state.loading = false

        if (reducerFailure) {
          reducerFailure(state as Type, action)
        }
      })
    },
  }
}
