// https://dev.to/ibrahimshamma99/write-your-own-custom-asyncdispatch-middleware-5dbk

import { EnhancedStore } from '@reduxjs/toolkit/src/configureStore'
import { AnyAction, Middleware } from 'redux'

const asyncDispatchMiddleware = (store: EnhancedStore) => (next: Middleware) => (action: AnyAction) => {
  let syncActivityFinished = false
  let actionQueue: AnyAction[] = []

  function flushQueue() {
    actionQueue.forEach((a) => {
      if (typeof a === 'function') {
        a()
      } else if (a instanceof Promise) {
        throw Error('asyncDispatch do not support "Promise"')
      } else {
        store.dispatch(a)
      }
    }) // flush queue
    actionQueue = []
  }

  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction])

    if (syncActivityFinished) {
      flushQueue()
    }
  }

  const actionWithAsyncDispatch = { ...action, asyncDispatch }

  next(actionWithAsyncDispatch)
  syncActivityFinished = true
  flushQueue()
}

export default asyncDispatchMiddleware
