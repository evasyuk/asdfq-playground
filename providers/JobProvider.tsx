import React, { useContext } from 'react'
import { createContext } from 'react'

type JobProviderContextResultType = {
  jobs: any[]
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
