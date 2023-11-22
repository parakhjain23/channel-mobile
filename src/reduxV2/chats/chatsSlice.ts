import { createSlice } from '@reduxjs/toolkit'
import { initialState , reducers} from './chatsReducer'
const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers
})

export const { 
  updateChatState,
  resetChatState,
  fetchMessagesStartV2,
  fetchMessagesSuccessV2,
  setlocalMsgActionV2,
  sendMessageStartV2,
  addNewMessageV2
 } = chatsSlice.actions

export default chatsSlice.reducer