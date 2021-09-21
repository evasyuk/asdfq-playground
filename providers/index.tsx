import React from 'react'
import { UserProvider } from './UserProvider'
import { JobProvider } from './JobProvider'
import { MatchProvider } from './MatchProvider'

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
  companyName: string
  companyLogo: string

  shortDescription: string
  longDescription: string

  mandatorySkills: SkillOption[]
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
