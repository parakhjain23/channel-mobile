import { call, put } from "redux-saga/effects";
import { fetchOrgsApi } from "../../api/getOrgsApi/OrgsApi";
import { getAllOrgsSuccessV2, updateOrgsState } from "./orgsSlice";
import { getAllUsersSuccessV2 } from "../allUsers/allUsersSlice";
import { getAllUsersV2 } from "../../api/getAllUsersofOrgApi/AllUsersOfOrgApiV2";

export function* getAllOrgsV2(accessToken: string) {
  try {
    var response = yield call(fetchOrgsApi)
    console.log(response)
    if (response?.length == 0) {
      yield put(updateOrgsState({ noOrgsFound: true }))
    } else {
      yield put(getAllOrgsSuccessV2(response))
    }
  } catch (error) {
    console.warn(error);
  }
}

export function* getAllUsersOfOrgV2(data: { accessToken: string, orgId: string }) {
  try {
    // var response = yield call(getAllUsersOfOrgApi, data?.accessToken, data?.orgId)
    var response = yield call(getAllUsersV2, data?.orgId)
    yield put(getAllUsersSuccessV2(response))
  } catch (error) {
    console.warn(error);
  }
}