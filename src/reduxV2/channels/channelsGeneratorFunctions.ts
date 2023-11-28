import { call, put } from "redux-saga/effects";
import { getChannelsApi } from "../../api/channelsApi/getChannels";
import { getAllChannelsSuccessV2, getAllRecentChannelSuccessV2 } from "./channelsSlice";
import { getRecenctChannelsApi } from "../../api/channelsApi/GetRecentChannelsApi";
import { getChannelsV2Api } from "../../api/channelsApi/getChannelsV2";
import { getRecenctChannelsV2Api } from "../../api/channelsApi/GetRecentChannelsV2Api";

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