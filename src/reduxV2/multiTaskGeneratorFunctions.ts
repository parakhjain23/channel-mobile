import { all, call, put } from "redux-saga/effects"
import { actionType } from "../types/actionDataType"
import { getAllOrgsV2, getAllUsersOfOrgV2 } from "./orgs/orgsGeneratorFunctions"
import { getUserDetailsV2 } from "./allUsers/allUserGeneratorFunctions"
import { getChannelsV2 } from "./channels/channelsGeneratorFunctions"
import { updateOrgsState } from "./orgs/orgsSlice"
import { updateChannelState } from "./channels/channelsSlice"

export function* getDataFromAccessToken(action: actionType<{ accessToken: string }>) {
  console.log("inside getDataFromAccessToken")
  yield all([
    call(getAllOrgsV2, action?.payload?.accessToken),
    call(getUserDetailsV2, action?.payload?.accessToken)
  ])
}

export function* getDataFromOrgId(action: actionType<{ accessToken: string, orgId: string, userId: string, userName: string }>) {
  console.log(action.payload, "-0-0-0-")
  console.log("inside getDataFromOrgId")
  yield all([
    call(getAllUsersOfOrgV2, action?.payload),
    call(getChannelsV2, action?.payload)
  ])
  yield put(updateOrgsState({ isLoading: false }))
}