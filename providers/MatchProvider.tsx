/* eslint-disable prettier/prettier */
import React, { useContext } from 'react'
import { createContext } from 'react'
import {useJobProvider} from "./JobProvider"
import {useUserProvider} from "./UserProvider"

type MatchProviderContextResultType = {
  mathced: any[];
  unmatched: any[];
}

type Props = { children: JSX.Element }
type MatchProviderType = (props: Props) => JSX.Element

export const MatchProviderContext =
  createContext<MatchProviderContextResultType>({
    mathced: [],
    unmatched: [],
  })

const getMatchUnmatch = (user, jobs) => {
  // TODO: do some work

  return {
    mathced: [],
    unmatched: []
  }
}

export const MatchProvider: MatchProviderType = ({ children }) => {
  const jobs = useJobProvider()
  const user = useUserProvider()

  const { mathced, unmatched } = getMatchUnmatch(user, jobs)

  return (
    <MatchProviderContext.Provider value={{ mathced, unmatched }}>
      {children}
    </MatchProviderContext.Provider>
  )
}

export const useMatchProvider = () => {
  return useContext(MatchProviderContext)
}
