import { createSlice } from '@reduxjs/toolkit'
import { initialState, reducers } from './appInfoReducer'
const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers
})

export const {
  updateAppInfoState,
  getSpaceTokenStartV2,
  getSpaceTokenSuccessV2,
  resetAppInfoState,
  initializeSocketV2
} = appInfoSlice.actions

export default appInfoSlice.reducer