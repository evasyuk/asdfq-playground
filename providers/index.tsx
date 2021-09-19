import React from 'react'
import { UserProvider } from './UserProvider'
import { JobProvider } from './JobProvider'
import { MatchProvider } from './MatchProvider'

const Providers = ({ chilldren }: { chilldren: JSX.Element }) => {
  return (
    <UserProvider>
      <JobProvider>
        <MatchProvider>{chilldren}</MatchProvider>
      </JobProvider>
    </UserProvider>
  )
}

export default Providers
