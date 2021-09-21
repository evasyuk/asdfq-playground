import React from 'react'
import { UserProvider } from './UserProvider'
import { JobProvider } from './JobProvider'
import { MatchProvider } from './MatchProvider'

export type User = {
  name: string
  surname: string

  photo: string

  skills: []
}

export type Job = {
  companyName: string
  companyLogo: string

  shortDescription: string
  longDescription: string

  mandatorySkills: []
}

const Providers = ({ chilldren }: { chilldren: JSX.Element }): JSX.Element => {
  return (
    <UserProvider>
      <JobProvider>
        <MatchProvider>{chilldren}</MatchProvider>
      </JobProvider>
    </UserProvider>
  )
}

export default Providers
