import { call, put } from "redux-saga/effects";
import { getChannelsApi } from "../../api/channelsApi/getChannels";

export function* getChannelsV2(data:{accessToken:string,orgId:string,userId:string}) {
    try {
      var response = yield call(getChannelsApi, data.accessToken, data.orgId, data.userId);
      yield put(
        // getChannelsSuccess(response, userId, accessToken, orgId, userName),
      );
    } catch (error) {
      console.warn(error);
    }
  }