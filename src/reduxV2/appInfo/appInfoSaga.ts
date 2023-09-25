import { takeLatest } from "redux-saga/effects";
import { getSpaceAccessTokenV2 } from "./appInfoGeneratorFunctions";
import { getUserDetailsV2 } from "../allUsers/allUserGeneratorFunctions";
import { getDataFromAccessToken } from "../multiTaskGeneratorFunctions";

function* AppInfoSaga() {
    // yield takeLatest(Actions.SAVE_TOKEN, getUserDetails);
    // yield takeLatest(Actions.GET_SPACE_TOKEN_START, getSpaceAccessToken);
    // yield takeLatest(Actions.SELECT_INITIAL_ORG_ID, getAllUsersOfOrg);
    // yield takeLatest(Actions.SEARCH_USER_PROFILE_START, fetchSearchedUserProfile);
    // yield takeLatest(Actions.UPDATE_USER_DETAILS_START, updateUserDetails);
    yield takeLatest('appInfo/getSpaceTokenStartV2',getSpaceAccessTokenV2)
    yield takeLatest('appInfo/getSpaceTokenSuccessV2',getDataFromAccessToken)
  }
  
  export default AppInfoSaga;