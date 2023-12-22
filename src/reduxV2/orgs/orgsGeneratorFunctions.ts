import { call, put, select } from "redux-saga/effects";
import { fetchOrgsApi, fetchOrgsUnreadCountApi, increaseOrgsUnreadCountApi } from "../../api/getOrgsApi/OrgsApi";
import { getAllOrgsSuccessV2, getAllOrgsUnreadCountSuccessV2, updateOrgsState } from "./orgsSlice";
import { getAllUsersSuccessV2 } from "../allUsers/allUsersSlice";
import { getAllUsersV2 } from "../../api/getAllUsersofOrgApi/AllUsersOfOrgApiV2";
import { increaseCountOnOrgCard } from "../../redux/actions/org/UnreadCountOnOrgCardsAction";
import { $ReduxCoreType } from "../../types/reduxCoreType";
import { actionType } from "../../types/actionDataType";

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

export function* getAllOrgsUnreadCount(){
  try {
    var response = yield call(fetchOrgsUnreadCountApi)
    yield put(getAllOrgsUnreadCountSuccessV2(response?.data))
  } catch (error) {
    console.warn(error);
  }
}

// export function* increaseCountOnOrgV2(action: actionType<{orgId:string}>) {
//   try {
//     const { orgsWithNewMessages } = yield select((state: $ReduxCoreType) => ({
//       orgsWithNewMessages: state?.orgs?.orgsWithNewMessages
//     }));
//     const count = orgsWithNewMessages?.[action?.payload?.orgId]
//     var response = yield call(increaseOrgsUnreadCountApi,action?.payload?.orgId,count)
//   } catch (error) {
//     console.warn(error);
//   }
// }