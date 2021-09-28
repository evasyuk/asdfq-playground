import { CarOptions, PropertyOptions, UserOptions } from '@asdfq/providers'

export const DefaultJobs = [
  {
    jobId: 'random' + Math.ceil(Math.random() * 10000000),

    companyName: 'companyName',
    companyLogo: 'companyLogo',

    address: {
      name: 'Case street, Illinois',
    },

    shortDescription: 'shortDescription shortDescription shortDescription',
    longDescription: 'longDescription longDescription longDescription longDescription',

    mandatorySkills: [
      UserOptions.MOTORCYCLE_ISSURANCE,
      CarOptions.MOTORCYCLE,
      PropertyOptions.HOUSE,
      PropertyOptions.GARAGE,
    ],
  },
  {
    jobId: 'random' + Math.ceil(Math.random() * 10000000),

    companyName: 'ABBYY',
    companyLogo: 'ABBYY',

    address: {
      name: 'Lincoln St, NY',
    },

    shortDescription: 'shortDescription shortDescription shortDescription',
    longDescription: 'longDescription longDescription longDescription longDescription',

    mandatorySkills: [
      UserOptions.MOTORCYCLE_ISSURANCE,
      CarOptions.MOTORCYCLE,
      PropertyOptions.HOUSE,
      PropertyOptions.GARAGE,
    ],
  },
  {
    jobId: 'random' + Math.ceil(Math.random() * 10000000),

    companyName: 'The ZOO',
    companyLogo: 'ZOO',

    address: {
      name: 'Brooklyn St, NY',
    },

    shortDescription: 'shortDescription shortDescription shortDescription',
    longDescription: 'longDescription longDescription longDescription longDescription',

    mandatorySkills: [
      UserOptions.MOTORCYCLE_ISSURANCE,
      CarOptions.MOTORCYCLE,
      PropertyOptions.HOUSE,
      PropertyOptions.GARAGE,
    ],
  },
  {
    jobId: 'random' + Math.ceil(Math.random() * 10000000),

    companyName: 'The ZOO',
    companyLogo: 'ZOO',

    address: {
      name: 'Brooklyn St, NY',
    },

    shortDescription: 'No match',
    longDescription: 'longDescription longDescription longDescription longDescription',

    mandatorySkills: [UserOptions.PAYPAL_ACCOUNT, PropertyOptions.HOUSE, PropertyOptions.GARAGE],
  },
]
