import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './chatsReducer'
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers
})

export const { updateChatState } = chatsSlice.actions

export default chatsSlice.reducer