import { all, fork } from "redux-saga/effects";
import AppInfoSaga from "./appInfo/appInfoSaga";
import ChannelsSaga from "./channels/channelsSaga";
import ChatSaga from "./chats/chatsSaga";
import AllUserSaga from "./allUsers/allUsersSaga";
import SearchedDataSaga from "./searchedData/searchedDataSaga";
import OrgsSaga from "./orgs/orgsSaga";

export default function* rootSaga() {
    yield all([
      // fork(OrgSaga),
      // fork(ChatSaga),
      // fork(UserSaga),
      // fork(ChannelSaga),
      // fork(SocketSaga),
      fork(AllUserSaga),
      fork(AppInfoSaga),
      fork(OrgsSaga),
      fork(ChannelsSaga),
      fork(ChatSaga),
      fork(SearchedDataSaga)
    ]);
  }
  