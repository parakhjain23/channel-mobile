import { call, put } from "redux-saga/effects";
import { actionType } from "../../types/actionDataType";
import { getUserDetailsApi } from "../../api/userDetailsApi/UserDetailsApi";
import { updateAllUserState } from "./allUsersSlice";

export function* getUserDetailsV2(accessToken:string) {
    try {
      var response = yield call(getUserDetailsApi,accessToken);
      yield put(updateAllUserState({currentUser:response}));
    } catch (error) {
      console.warn(error);
    }
}