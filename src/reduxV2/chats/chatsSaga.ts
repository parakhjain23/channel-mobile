import { takeLatest } from "redux-saga/effects";
import { sendMessages } from "./chatsGeneratorFunctions";
import { getMessages } from "./chatsGeneratorFunctions";

function* ChatSaga() {
  yield takeLatest('chats/fetchMessagesStartV2',getMessages)
  yield takeLatest('chats/sendMessageStartV2', sendMessages);
    // yield takeLatest(Actions.SAVE_TOKEN, getUserDetails);
    // yield takeLatest(Actions.GET_SPACE_TOKEN_START, getSpaceAccessToken);
    // yield takeLatest(Actions.SELECT_INITIAL_ORG_ID, getAllUsersOfOrg);
    // yield takeLatest(Actions.SEARCH_USER_PROFILE_START, fetchSearchedUserProfile);
    // yield takeLatest(Actions.UPDATE_USER_DETAILS_START, updateUserDetails);
  }
  
  export default ChatSaga;