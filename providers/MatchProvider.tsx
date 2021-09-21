import React, { useContext } from 'react'
import { createContext } from 'react'
import { useJobProvider } from './JobProvider'
import { useUserProvider } from './UserProvider'
import { Job, User } from './index'

type MatchProviderContextResultType = {
  matched: Job[]
  unmatched: Job[]
}

type Props = { children: JSX.Element }
type MatchProviderType = (props: Props) => JSX.Element

export const MatchProviderContext =
  createContext<MatchProviderContextResultType>({
    matched: [],
    unmatched: [],
  })

export const getMatchUnmatch = (user: User, jobs: Job[]) => {
  const matched: Job[] = []
  const unmatched: Job[] = []

  jobs.forEach((job) => {
    const jobMatchedSuccssfully = job.mandatorySkills
      .map((mandatorySkill) =>
        user.skills.find((userSkill) => userSkill === mandatorySkill),
      )
      .filter((possiblyMatchedSkill) => possiblyMatchedSkill)

    if (jobMatchedSuccssfully) {
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

export const MatchProvider: MatchProviderType = ({ children }) => {
  const { jobs } = useJobProvider()
  const { user } = useUserProvider()

  const { matched, unmatched } = getMatchUnmatch(user, jobs)

  return (
    <MatchProviderContext.Provider value={{ matched, unmatched }}>
      {children}
    </MatchProviderContext.Provider>
  )
}

export const useMatchProvider = () => {
  return useContext(MatchProviderContext)
}
