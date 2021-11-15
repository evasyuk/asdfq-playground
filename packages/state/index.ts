import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@asdfq/state/slices/userSlice'
import getMiddlewares from '@asdfq/state/middlewares'

export interface LoadableState {
  loading: boolean
}

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
  },
  middleware: getMiddlewares,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
