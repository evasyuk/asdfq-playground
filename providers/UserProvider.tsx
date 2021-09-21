import React, { useContext } from 'react'
import { createContext } from 'react'
import { User } from './index'

type UserProviderContextResultType = {
  user: User
}

type Props = { children: JSX.Element }
type UserProviderType = (props: Props) => JSX.Element

const UserDefault = {
  name: '',
  surname: '',

  photo: '',
  skills: [],
}

export const UserProviderContext = createContext<UserProviderContextResultType>(
  {
    user: UserDefault as User,
  },
)

export const UserProvider: UserProviderType = ({ children }) => {
  return (
    <UserProviderContext.Provider value={{ user: UserDefault as User }}>
      {children}
    </UserProviderContext.Provider>
  )
}

export const useUserProvider = () => {
  return useContext(UserProviderContext)
}
