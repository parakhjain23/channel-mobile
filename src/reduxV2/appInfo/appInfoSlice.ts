import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './appInfoReducer'
const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers
})

export const { 
  updateAppInfoState,
  getSpaceTokenStartV2,
  getSpaceTokenSuccessV2,
  initializeSocketV2,
  subscribeToNotificationsV2,
  resetAppInfoState,
 } = appInfoSlice.actions

export default appInfoSlice.reducer