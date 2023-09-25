import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './orgsReducer'
const orgsSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers
})

export const {
   updateOrgsState ,
   setCurrentOrgIdV2 ,
   getAllOrgsSuccessV2
  } = orgsSlice.actions

export default orgsSlice.reducer