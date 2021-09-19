import React, { useContext } from 'react'
import { createContext } from 'react'

type UserProviderContextResultType = {
  user: any
}

type Props = { children: JSX.Element }
type UserProviderType = (props: Props) => JSX.Element

export const UserProviderContext = createContext<UserProviderContextResultType>(
  {
    user: [],
  },
)

export const UserProvider: UserProviderType = ({ children }) => {
  return (
    <UserProviderContext.Provider value={{ user: [] }}>
      {children}
    </UserProviderContext.Provider>
  )
}

export const useUserProvider = () => {
  return useContext(UserProviderContext)
}
