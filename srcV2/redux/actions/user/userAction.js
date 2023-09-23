import {call, put} from 'redux-saga/effects';
import {getUserDetailsApi} from '../../../api/userDetailsApi/UserDetailsApi';
import * as Actions from '../../Enums';
import {updateUserDetailsApi} from '../../../api/userDetailsApi/UpdateUserDetailsApi';

export function* getUserDetails({accessToken}) {
  try {
    var response = yield call(getUserDetailsApi, accessToken);
    yield put(getUserDetailsSuccess(response));
  } catch (error) {
    console.warn(error);
  }
}

export function getUserDetailsSuccess(data) {
  return {
    type: Actions.FETCH_USER_DETAILS_SUCCESS,
    userDetails: data,
  };
}

export default function signOut() {
  return {
    type: Actions.SIGN_OUT,
  };
}

export function* updateUserDetails({accessToken, userId, attachement}) {
  try {
    var response = yield call(
      updateUserDetailsApi,
      accessToken,
      userId,
      attachement,
    );
    yield put(updateUserDetailsSuccess(response));
  } catch (error) {
    console.warn(error);
  }
}
export function updateUserDetailsStart(accessToken, userId, attachement) {
  return {
    type: Actions.UPDATE_USER_DETAILS_START,
    accessToken,
    userId,
    attachement,
  };
}
export function updateUserDetailsSuccess(data) {
  return {
    type: Actions.FETCH_USER_DETAILS_SUCCESS,
    userDetails: data,
  };
}
