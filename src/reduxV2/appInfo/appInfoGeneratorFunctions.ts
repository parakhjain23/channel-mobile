import {all, call, put} from 'redux-saga/effects';
import { actionType } from '../../types/actionDataType';
import { getSpaceAccessTokenApi } from '../../api/spaceAccessTokenApi/SpaceAccessTokenApi';
import { getSpaceTokenSuccess, updateAppInfoState } from './appInfoSlice';

export function* getSpaceAccessTokenV2(action:actionType<{firebaseToken:string}>) {
    try {
      var response = yield call(getSpaceAccessTokenApi,action?.payload?.firebaseToken);
      yield put(getSpaceTokenSuccess({accessToken:response?.accessToken}))
    } catch (error) {
      console.warn(error);
    }
  }

  export function saveUserToken(response) {
    return {
      type: Actions.SAVE_TOKEN,
      accessToken:response.accessToken,
    };
  }



