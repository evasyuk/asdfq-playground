import { createLogger } from 'redux-logger'
import { isDEV } from '@asdfq/utils/isDEV'

import asyncDispatchMiddleware from './asyncDispatch'
import apiMiddleware from './apiMiddleware'

import { apiClient } from '../../api'

const middlewares = [apiMiddleware(apiClient), asyncDispatchMiddleware]
if (isDEV()) {
  // global.XMLHttpRequest = global.originalXMLHttpRequest ?
  //   global.originalXMLHttpRequest :
  //   global.XMLHttpRequest
  // global.FormData = global.originalFormData ?
  //   global.originalFormData :
  //   global.FormData
  // // TODO fix logger if needed;
  middlewares.push(createLogger({ collapsed: true }))
}

const getMiddlewares = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['NETWORK'],
    },
  }).concat(middlewares)

export default getMiddlewares
