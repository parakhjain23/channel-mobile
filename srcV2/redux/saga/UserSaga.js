import {takeLatest} from 'redux-saga/effects';
import {getAllUsersOfOrg} from '../actions/org/GetAllUsersOfOrg';
import {fetchSearchedUserProfile} from '../actions/user/searchUserProfileActions';
import {getUserDetails, updateUserDetails} from '../actions/user/userAction';
import * as Actions from '../Enums';
import {getSpaceAccessToken} from '../actions/spaceToken/SpaceTokenActions';

function* UserSaga() {
  yield takeLatest(Actions.SAVE_TOKEN, getUserDetails);
  yield takeLatest(Actions.GET_SPACE_TOKEN_START, getSpaceAccessToken);
  // yield takeLatest(Actions.SELECT_CURRENT_ORG_ID, getAllUsersOfOrg);
  yield takeLatest(Actions.SEARCH_USER_PROFILE_START, fetchSearchedUserProfile);
  yield takeLatest(Actions.UPDATE_USER_DETAILS_START, updateUserDetails);
}

export default UserSaga;
