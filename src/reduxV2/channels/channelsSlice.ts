import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './channelsReducer'
const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers
})

export const { 
  updateChannelState,
  getAllChannelsSuccessV2
} = channelsSlice.actions

export default channelsSlice.reducer