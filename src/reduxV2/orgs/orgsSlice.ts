import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './orgsReducer'
const orgsSlice = createSlice({
  name: 'orgs',
  initialState,
  reducers
})

export const {
   updateOrgsState ,
   setCurrentOrgId ,
   getAllOrgsSuccess
  } = orgsSlice.actions

export default orgsSlice.reducer