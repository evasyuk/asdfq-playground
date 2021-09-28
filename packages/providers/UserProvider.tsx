import usePrevious from 'react-use/lib/usePrevious'
import { createContext, useContext, useEffect, useState } from 'react'

import { getItemAsync, setItemAsync, StorageKey } from '@asdfq/utils/asyncStorage'
import { addSkill, removeSkill } from '@asdfq/utils/skills'
import { SkillOption, User } from '@asdfq/providers'

import { ViewWrapperProps } from '../../types'

type UserProviderContextResultType = {
  loading: boolean

  user: User

  setUserName: (name: string) => void
  setUserSurname: (surname: string) => void
  setUserSkills: (isAdded: boolean, skill: SkillOption) => void
}

const EMPTY_USER = {
  name: '',
  surname: '',
  photo: '',
  skills: [],
} as User

const getInitialState = async (): Promise<User> => {
  const encodedUser = (await getItemAsync<string>(StorageKey.USER)) || JSON.stringify(EMPTY_USER)

  return JSON.parse(encodedUser) as User
}

const UserProviderContext = createContext<UserProviderContextResultType | null>(null)

export const UserProvider: ViewWrapperProps = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [localUser, setLocalUser] = useState<User>(EMPTY_USER)

  const previousLocalUser = usePrevious(localUser)

  const setUserName = (name) => setLocalUser((oldUser) => ({ ...oldUser, name }))
  const setUserSurname = (surname) => setLocalUser((oldUser) => ({ ...oldUser, surname }))

  const setUserSkills = (isAdded, skill) => {
    setLocalUser((oldUser) => {
      return { ...oldUser, skills: isAdded ? addSkill(oldUser.skills, skill) : removeSkill(oldUser.skills, skill) }
    })
  }

  useEffect(() => {
    setLoading(true)
    getInitialState()
      .then(setLocalUser)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!previousLocalUser) {
      return
    }

    setLoading(true)
    setItemAsync(StorageKey.USER, JSON.stringify(localUser)).finally(() => setLoading(false))
  }, [localUser])

  return (
    <UserProviderContext.Provider
      value={{
        loading,
        user: localUser,
        setUserName,
        setUserSurname,
        setUserSkills,
      }}
    >
      {children}
    </UserProviderContext.Provider>
  )
}

export const useUserProvider = (): UserProviderContextResultType => {
  const context = useContext<UserProviderContextResultType | null>(UserProviderContext)

  if (!context) {
    throw new Error('Using useUserProvider outside of UserProvider')
  }

  return context
}
