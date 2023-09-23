import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './channelsReducer'
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers
})

export const { updateChannelState } = channelsSlice.actions

export default channelsSlice.reducer