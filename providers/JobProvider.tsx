import { createContext, useContext, useEffect, useState } from 'react'
import { Job } from './'
import { ViewWrapperProps } from '../types'
import { getItemAsync, setItemAsync, StorageKey } from '../utils/asyncStorage'
import usePrevious from 'react-use/lib/usePrevious'

type JobProviderContextResultType = {
  loading: boolean

  jobs: Job[]

  addNewJob: (Job) => void
  removeJob: (Job) => void
  editJob: (Job) => void
}

const getInitialState = async (): Promise<Job[]> => {
  const encodedJobs = (await getItemAsync<string>(StorageKey.JOBS)) || '[]'

  return JSON.parse(encodedJobs) as Job[]
}

export const JobProviderContext = createContext<JobProviderContextResultType | null>(null)

const addNewJobToArray = (job: Job, oldArray: Job[]) => {
  const newArray = oldArray.slice()

  newArray.push(job)

  return newArray
}

const removeJobFromArray = (job: Job, oldArray: Job[]) => {
  const newArray = oldArray.slice()
  const index = newArray.indexOf(job)

  if (index > -1) {
    newArray.splice(index, 1)
  }

  return newArray
}

const replaceJobInArray = (job: Job, oldArray: Job[]) => {
  const newArray = oldArray.slice()
  const index = newArray.indexOf(job) // TODO: lookup by ID

  if (index > -1) {
    newArray[index] = job
  }

  return newArray
}

export const JobProvider: ViewWrapperProps = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [localJobs, setLocalJobs] = useState<Job[]>([])

  const previousJobs = usePrevious(localJobs)

  useEffect(() => {
    setLoading(true)
    getInitialState()
      .then(setLocalJobs)
      .finally(() => setLoading(false))
  }, [])

  const addNewJob = (job: Job) => {
    setLocalJobs((oldJobs) => addNewJobToArray(job, oldJobs))
  }

  const removeJob = (job: Job) => {
    setLocalJobs((oldJobs) => removeJobFromArray(job, oldJobs))
  }

  const editJob = (job: Job) => {
    setLocalJobs((oldJobs) => replaceJobInArray(job, oldJobs))
  }

  useEffect(() => {
    if (!previousJobs) {
      return
    }

    setLoading(true)
    setItemAsync(StorageKey.JOBS, JSON.stringify(localJobs)).finally(() => setLoading(false))
  }, [localJobs])

  return (
    <JobProviderContext.Provider
      value={{
        loading,
        jobs: localJobs,
        addNewJob,
        removeJob,
        editJob,
      }}
    >
      {children}
    </JobProviderContext.Provider>
  )
}

export const useJobProvider = (): JobProviderContextResultType => {
  const context = useContext(JobProviderContext)

  if (!context) {
    throw new Error('Using useJobProvider outside of JobProvider')
  }

  return context
}
