import { useContext } from 'react'
import { createContext } from 'react'
import { CarOptions, Job, PropertyOptions, UserOptions } from './'

type JobProviderContextResultType = {
  jobs: Job[]
}

type Props = { children: JSX.Element }
type JobProviderType = (props: Props) => JSX.Element

const DefaultJobs = [
  {
    companyName: 'companyName',
    companyLogo: 'companyLogo',

    shortDescription: 'shortDescription shortDescription',
    longDescription:
      'longDescription longDescription longDescription longDescription',

    mandatorySkills: [
      UserOptions.MOTORCYCLE_ISSURANCE,
      CarOptions.MOTORCYCLE,
      PropertyOptions.HOUSE,
      PropertyOptions.GARAGE,
    ],
  },
]

export const JobProviderContext = createContext<JobProviderContextResultType>({
  jobs: DefaultJobs,
})

export const JobProvider: JobProviderType = ({ children }) => {
  return (
    <JobProviderContext.Provider value={{ jobs: DefaultJobs }}>
      {children}
    </JobProviderContext.Provider>
  )
}

export const useJobProvider = () => {
  return useContext(JobProviderContext)
}
