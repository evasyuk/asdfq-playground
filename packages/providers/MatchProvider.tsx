import { useContext, useEffect, useState, createContext } from 'react'

import { useJobProvider } from '@asdfq/providers/JobProvider'
import { Job, User } from '@asdfq/providers/index'

import { ViewWrapperProps } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '@asdfq/state'

type MatchProviderContextResultType = {
  matched: Job[]
  unmatched: Job[]
}

export const MatchProviderContext = createContext<MatchProviderContextResultType>({
  matched: [],
  unmatched: [],
})

export const getMatchUnmatch = (user: User, jobs: Job[]): MatchProviderContextResultType => {
  const matched: Job[] = []
  const unmatched: Job[] = []

  const userSkillObj = user.skills.reduce((acc, curr) => {
    acc[curr] = curr
    return acc
  }, {})

  jobs?.forEach((job) => {
    const missingMatch = job.mandatorySkills.find((mandatorySkill) => !userSkillObj[mandatorySkill])

    if (!missingMatch) {
      matched.push(job)
    } else {
      unmatched.push(job)
    }
  })

  return {
    matched,
    unmatched,
  }
}

export const MatchProvider: ViewWrapperProps = ({ children }) => {
  const [localState, setLocalState] = useState({ matched: [] as Job[], unmatched: [] as Job[] })
  const { jobs, loading: jobLoading } = useJobProvider()
  const { user, loading: userLoading } = useSelector((state: RootState) => state.userSlice)

  useEffect(() => {
    if (!jobLoading && !userLoading) {
      const { matched, unmatched } = getMatchUnmatch(user, jobs)
      setLocalState({ matched, unmatched })
    }
  }, [jobLoading, userLoading])

  return <MatchProviderContext.Provider value={localState}>{children}</MatchProviderContext.Provider>
}

export const useMatchProvider = (): MatchProviderContextResultType => {
  return useContext(MatchProviderContext)
}
