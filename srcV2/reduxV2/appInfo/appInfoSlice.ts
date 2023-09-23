import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './appInfoReducer'
const appInfoSlice = createSlice({
  name: 'appInfo',
  initialState,
  reducers
})

export const { updateAppInfoState } = appInfoSlice.actions

export default appInfoSlice.reducer