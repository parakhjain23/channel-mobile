import { takeLatest } from "redux-saga/effects";
import { getDataFromOrgId } from "../multiTaskGeneratorFunctions";
import { increaseCountOnOrgV2 } from "./orgsGeneratorFunctions";

function* OrgsSaga() {
  // yield takeLatest(Actions.SAVE_TOKEN, getUserDetails);
  // yield takeLatest(Actions.GET_SPACE_TOKEN_START, getSpaceAccessToken);
  // yield takeLatest(Actions.SELECT_INITIAL_ORG_ID, getAllUsersOfOrg);
  // yield takeLatest(Actions.SEARCH_USER_PROFILE_START, fetchSearchedUserProfile);
  // yield takeLatest(Actions.UPDATE_USER_DETAILS_START, updateUserDetails);
  yield takeLatest('orgs/setCurrentOrgIdV2', getDataFromOrgId);
  // yield takeLatest('orgs/increaseCountOnOrgCardV2',increaseCountOnOrgV2)
}

export default OrgsSaga;