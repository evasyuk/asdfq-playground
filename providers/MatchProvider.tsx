import { useContext } from 'react'
import { createContext } from 'react'
import { useJobProvider } from './JobProvider'
import { useUserProvider } from './UserProvider'
import { Job, User } from './index'
import { ViewWrapperProps } from '../types'

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

  jobs.forEach((job) => {
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
  const { jobs } = useJobProvider()
  const { user } = useUserProvider()

  const { matched, unmatched } = getMatchUnmatch(user, jobs)

  return <MatchProviderContext.Provider value={{ matched, unmatched }}>{children}</MatchProviderContext.Provider>
}

export const useMatchProvider = (): MatchProviderContextResultType => {
  return useContext(MatchProviderContext)
}
