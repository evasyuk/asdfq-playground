import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SkillOption, User } from '@asdfq/providers'
import { addSkill, removeSkill } from '@asdfq/utils/skills'
import { ApiClient } from '@asdfq/api'
import { LoadableState } from '@asdfq/state'
import { getNetworkRequest } from '@asdfq/api/reduxToolkitHelper'

const EMPTY_USER = {
  name: '1',
  surname: '2',
  photo: '',
  skills: [],
} as User

export interface UserState extends LoadableState {
  user: User
}

const initialState: UserState = {
  user: EMPTY_USER,
  loading: false,
}

const getUserRequest = getNetworkRequest<UserState>('getUser', (api: ApiClient) => api.users.getMyUser())

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload
    },

    setUserSurname: (state, action: PayloadAction<string>) => {
      state.user.surname = action.payload
    },

    setUserSkills: (state, action: PayloadAction<{ isAdded: boolean; skill: SkillOption }>) => {
      const isAdded = action.payload.isAdded
      const skill = action.payload.skill

      state.user.skills = isAdded ? addSkill(state.user.skills, skill) : removeSkill(state.user.skills, skill)
    },
  },
  extraReducers: (builder) => {
    getUserRequest.reduce(builder)
  },
})

// Action creators are generated for each case reducer function
export { getUserRequest }
export const { setUserName, setUserSurname, setUserSkills } = userSlice.actions
export default userSlice.reducer
