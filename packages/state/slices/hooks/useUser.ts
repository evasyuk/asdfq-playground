import { useDispatch, useSelector } from 'react-redux'
import { setUserName, setUserSkills, setUserSurname } from '@asdfq/state/slices/userSlice'
import { SkillOption, User } from '@asdfq/providers'
import { RootState } from '@asdfq/state'

type UseUserReturnType = {
  user: User
  loading: boolean
  onChangeUserName: (string) => void
  onChangeUserSurname: (string) => void
  onChangeUserSkills: (boolean, SkillOption) => void
}

export const useUser = (): UseUserReturnType => {
  const { user, loading } = useSelector((state: RootState) => state.userSlice)
  const dispatch = useDispatch()

  const onChangeUserName = (userName) => dispatch(setUserName(userName))
  const onChangeUserSurname = (surname) => dispatch(setUserSurname(surname))
  const onChangeUserSkills = (isAdded: boolean, skill: SkillOption) => dispatch(setUserSkills({ isAdded, skill }))

  // const temp = () => dispatch(getUserRequest.getAction())

  return {
    user,
    loading,
    onChangeUserName,
    onChangeUserSurname,
    onChangeUserSkills,
  }
}
