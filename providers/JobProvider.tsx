import React, { useContext } from 'react'
import { createContext } from 'react'
import { Job } from './'

type JobProviderContextResultType = {
  jobs: Job[]
}

type Props = { children: JSX.Element }
type JobProviderType = (props: Props) => JSX.Element

export const JobProviderContext = createContext<JobProviderContextResultType>({
  jobs: [],
})

export const JobProvider: JobProviderType = ({ children }) => {
  return (
    <JobProviderContext.Provider value={{ jobs: [] }}>
      {children}
    </JobProviderContext.Provider>
  )
}

export const useJobProvider = () => {
  return useContext(JobProviderContext)
}
