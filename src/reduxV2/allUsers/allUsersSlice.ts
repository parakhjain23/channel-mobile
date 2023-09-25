import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './allUsersReducer'
const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers
})

export const { 
  updateAllUserState ,
  getAllUsersSuccessV2
} = allUsersSlice.actions

export default allUsersSlice.reducer
