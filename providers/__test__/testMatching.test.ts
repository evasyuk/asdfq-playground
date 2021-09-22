import { getMatchUnmatch } from '../MatchProvider'
import { Job, SkillOption, User, UserOptions } from '../'

const abstractSkillMatcher = (userSkills: SkillOption[], jobSkills: SkillOption[]) => {
  const user = {
    name: '',
    surname: '',

    skills: userSkills,
  } as User

  const jobs = [
    {
      companyName: '',
      companyLogo: '',

      shortDescription: '',
      longDescription: '',

      mandatorySkills: jobSkills,
    } as Job,
  ]

  return {
    user,
    jobs,
  }
}

test('Check one match', () => {
  console.log('UserOptions', UserOptions)

  const { user, jobs } = abstractSkillMatcher([UserOptions.CAR_ISSURANCE], [UserOptions.CAR_ISSURANCE])

  const { matched } = getMatchUnmatch(user, jobs)

  expect(matched.length).toEqual(1)
})
