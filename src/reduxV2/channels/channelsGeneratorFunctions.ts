import { call, put } from "redux-saga/effects";
import { getChannelsApi } from "../../api/channelsApi/getChannels";
import { getAllChannelsSuccessV2 } from "./channelsSlice";

export function* getChannelsV2(data: { accessToken: string, orgId: string, userId: string }) {
  try {
    console.log("get all channels")
    var response = yield call(getChannelsApi, data.accessToken, data.orgId, data.userId);
    yield put(getAllChannelsSuccessV2(response));
  } catch (error) {
    console.warn(error);
  }
}