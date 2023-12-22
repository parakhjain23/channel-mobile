import { call, put } from "redux-saga/effects";
import { getAllChannelsSuccessV2, getAllRecentChannelSuccessV2, resetUnreadCountSuccessV2 } from "./channelsSlice";
import { getChannelsV2Api, getRecentChannelsV2Api, resetUnreadCountV2Api } from "../../api/channelsApi/ChannelsApiV2";
import { actionType } from "../../types/actionDataType";

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
    var response = yield call(getRecentChannelsV2Api, data.orgId, data.userId);
    yield put(getAllRecentChannelSuccessV2({recentChannels:response,userId:data.userId , userName:data.userName}));
    // yield put(getChannelDetailsStart(accessToken, orgId, userId));
  } catch (error) {
    console.warn(error);
  }
}

export function* resetUnreadCountV2(action: actionType<{orgId:string, userId:string, teamId:string, badgeCount:number, unreadCount: number}>){
  try {
    var response = yield call(resetUnreadCountV2Api, action?.payload?.orgId, action?.payload?.userId, action?.payload?.teamId, action?.payload?.badgeCount, action?.payload?.unreadCount);
    yield put(resetUnreadCountSuccessV2({response:response,teamId:action?.payload?.teamId}))
  } catch (error) {
    console.warn(error);
  }
}