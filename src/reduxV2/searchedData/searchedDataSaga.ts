import { takeLatest } from "redux-saga/effects";
import { getChannelsByQueryV2 } from "./searchedDataGeneratorFunctions";

function* SearchedDataSaga() {
  // yield takeLatest(Actions.SAVE_TOKEN, getUserDetails);
  // yield takeLatest(Actions.GET_SPACE_TOKEN_START, getSpaceAccessToken);
  // yield takeLatest(Actions.SELECT_INITIAL_ORG_ID, getAllUsersOfOrg);
  // yield takeLatest(Actions.SEARCH_USER_PROFILE_START, fetchSearchedUserProfile);
  // yield takeLatest(Actions.UPDATE_USER_DETAILS_START, updateUserDetails);
  yield takeLatest('searchedData/getChannelsByQueryStartV2', getChannelsByQueryV2)
}

export default SearchedDataSaga;