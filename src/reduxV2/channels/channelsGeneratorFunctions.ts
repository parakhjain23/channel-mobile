import { call, put } from "redux-saga/effects";
import { getAllChannelsSuccessV2, getAllRecentChannelSuccessV2 } from "./channelsSlice";
import { getChannelsV2Api, getRecenctChannelsV2Api } from "../../api/channelsApi/ChannelsApiV2";

export function* getChannelsV2(data: { accessToken: string, orgId: string, userId: string  , userName:string}) {
  try {
    var response = yield call(getChannelsV2Api, data.orgId, data.userId);
    yield put(getAllChannelsSuccessV2({channels : response , userId:data.userId , userName:data.userName}));
    yield call(getRecentChannelsV2,data)
  } catch (error) {
    console.warn(error);
  }
}

export function* getRecentChannelsV2(data: { accessToken: string, orgId: string, userId: string  , userName:string}) {
  try {
    var response = yield call(getRecenctChannelsV2Api, data.orgId, data.userId);
    yield put(getAllRecentChannelSuccessV2({recentChannels:response,userId:data.userId , userName:data.userName}));
    // yield put(getChannelDetailsStart(accessToken, orgId, userId));
  } catch (error) {
    console.warn(error);
  }
}