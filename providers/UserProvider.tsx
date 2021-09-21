import { useContext } from 'react'
import { createContext } from 'react'
import { CarOptions, PropertyOptions, User, UserOptions } from './index'

type UserProviderContextResultType = {
  user: User
}

type Props = { children: JSX.Element }
type UserProviderType = (props: Props) => JSX.Element

const UserDefault = {
  name: '',
  surname: '',

  photo: '',
  skills: [
    UserOptions.MOTORCYCLE_ISSURANCE,
    CarOptions.MOTORCYCLE,
    PropertyOptions.HOUSE,
    PropertyOptions.GARAGE,
  ],
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
