import { call, put } from "redux-saga/effects";
import { getChannelsApi } from "../../api/channelsApi/getChannels";
import { getAllChannelsSuccessV2, getAllRecentChannelSuccessV2 } from "./channelsSlice";
import { getRecenctChannelsApi } from "../../api/channelsApi/GetRecentChannelsApi";

export function* getChannelsV2(data: { accessToken: string, orgId: string, userId: string  , userName:string}) {
  try {
    var response = yield call(getChannelsApi, data.accessToken, data.orgId, data.userId);
    yield put(getAllChannelsSuccessV2({channels : response , userId:data.userId , userName:data.userName}));
    yield call(getRecentChannelsV2,data)
  } catch (error) {
    console.warn(error);
  }
}

export function* getRecentChannelsV2(data: { accessToken: string, orgId: string, userId: string  , userName:string}) {
  try {
    console.log("get all recent channels")
    var response = yield call(getRecenctChannelsApi,data.accessToken, data.orgId, data.userId);
    yield put(getAllRecentChannelSuccessV2({recentChannels:response,userId:data.userId , userName:data.userName}));
    // yield put(getChannelDetailsStart(accessToken, orgId, userId));
  } catch (error) {
    console.warn(error);
  }
}