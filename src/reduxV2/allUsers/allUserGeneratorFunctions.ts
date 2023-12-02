import { call, put } from "redux-saga/effects";
import { actionType } from "../../types/actionDataType";
import { getUserDetailsApi } from "../../api/userDetailsApi/UserDetailsApi";
import { updateAllUsersState } from "./allUsersSlice";
import { getUserDetailsV2Api } from "../../api/userDetailsApi/UserDetailsApiV2";

export function* getUserDetailsV2(accessToken: string) {
  try {
    var response = yield call(getUserDetailsV2Api);
    yield put(updateAllUsersState({ currentUser: response }));
  } catch (error) {
    console.warn(error);
  }
}