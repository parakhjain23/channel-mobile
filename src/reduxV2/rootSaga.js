import { fork } from "redux-saga/effects";
import AppInfoSaga from "./appInfo/appInfoSaga";
import ChannelsSaga from "./channels/channelsSaga";
import ChatSaga from "./chats/chatsSaga";
import AllUserSaga from "./allUsers/allUsersSaga";
import SearchedDataSaga from "./searchedData/searchedDataSaga";

export default function* rootSaga() {
    yield all([
      // fork(OrgSaga),
      // fork(ChatSaga),
      // fork(UserSaga),
      // fork(ChannelSaga),
      // fork(SocketSaga),
      fork(AllUserSaga),
      fork(AppInfoSaga),
      fork(ChannelsSaga),
      fork(ChatSaga),
      fork(SearchedDataSaga)
    ]);
  }
  