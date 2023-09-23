import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './searchedDataReducer'
const searchedDataSlice = createSlice({
  name: 'searchedData',
  initialState,
  reducers
})

export const { updateSearchedDataState } = searchedDataSlice.actions

export default searchedDataSlice.reducer