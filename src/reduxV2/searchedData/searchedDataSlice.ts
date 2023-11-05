import { createSlice } from '@reduxjs/toolkit'
import { initialState, reducers } from './searchedDataReducer'
const searchedDataSlice = createSlice({
  name: 'searchedData',
  initialState,
  reducers
})

export const {
  updateSearchedDataState,
  getChannelsByQueryStartV2,
  getChannelsByQuerySuccessV2
} = searchedDataSlice.actions

export default searchedDataSlice.reducer