import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { store } from '@asdfq/state'

import { JobProvider } from '@asdfq/providers/JobProvider'
import { MatchProvider } from '@asdfq/providers/MatchProvider'

import { ChildrenProps } from '../../types'

export enum CarOptions {
  FIVE_DOOR_CAR = 'FIVE_DOOR_CAR',
  FOUR_DOOR_CAR = 'FOUR_DOOR_CAR',
  THREE_DOOR_CAR = 'THREE_DOOR_CAR',
  TWO_DOOR_CAR = 'TWO_DOOR_CAR',
  SCOOTER = 'SCOOTER',
  BIKE = 'BIKE',
  MOTORCYCLE = 'MOTORCYCLE',
}

export enum UserOptions {
  CAR_ISSURANCE = 'CAR_ISSURANCE',
  MOTORCYCLE_ISSURANCE = 'MOTORCYCLE_ISSURANCE',
  LIABILITY_ISSURANCE = 'LIABILITY_ISSURANCE',

  DRIVER_LICENSE = 'DRIVER_LICENSE',

  SOCIAL_SECURITY_NUMBER = 'SOCIAL_SECURITY_NUMBER',
  WORK_PERMIT = 'WORK_PERMIT',

  MASSAGE_QUALIFICATION = 'MASSAGE_QUALIFICATION',

  PAYPAL_ACCOUNT = 'PAYPAL_ACCOUNT',
}

export enum PropertyOptions {
  HOUSE = 'HOUSE',
  APPARTMENT = 'APPARTMENT',
  STORAGE_PLACE = 'STORAGE_PLACE',
  GARAGE = 'GARAGE',
}

export type SkillOption = CarOptions | UserOptions | PropertyOptions

export type User = {
  name: string
  surname: string

  photo?: string

  skills: SkillOption[]
}

export type Job = {
  jobId: string

  companyName: string
  companyLogo: string

  address: {
    name: string
  }

  shortDescription: string
  longDescription: string

  mandatorySkills: SkillOption[]
}

const Providers = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <SafeAreaProvider>
      <JobProvider>
        <Provider store={store}>
          <MatchProvider>{children}</MatchProvider>
        </Provider>
      </JobProvider>
    </SafeAreaProvider>
  )
}

export default Providers
