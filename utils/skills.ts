import { SkillOption } from '../providers'

export const addSkill = (oldArray: Array<SkillOption>, skill: SkillOption): Array<SkillOption> => {
  const newArray = oldArray.slice()

  newArray.push(skill)

  return newArray
}

export const removeSkill = (oldArray: Array<SkillOption>, skill: SkillOption): Array<SkillOption> => {
  const newArray = oldArray.slice()
  const index = newArray.indexOf(skill)

  if (index > -1) {
    newArray.splice(index, 1)
  }

  return newArray
}
