import {call, put} from 'redux-saga/effects';
import {getRecenctChannelsApi} from '../../../api/channelsApi/GetRecentChannelsApi';
import * as Actions from '../../Enums';
import {getChannelDetailsApi} from '../../../api/channelsApi/GetChannelDetailsApi';

export function* getRecentChannels({accessToken, orgId, userId}) {
  try {
    var response = yield call(
      getRecenctChannelsApi,
      accessToken,
      orgId,
      userId,
    );
    yield put(getRecentChannelsSuccess(response));
    yield put(getChannelDetailsStart(accessToken, orgId, userId));
  } catch (error) {
    console.warn(error);
  }
}

export function getRecentChannelsSuccess(response) {
  return {
    type: Actions.FETCH_RECENT_CHANNELS_SUCCESS,
    recentChannels: response,
  };
}

export function* getChannelDetails({accessToken, orgId, userId}) {
  try {
    var response = yield call(getChannelDetailsApi, accessToken, orgId, userId);
    yield put(getChannelDetailsSuccess(response));
  } catch (error) {
    console.warn(error);
  }
}

export function getChannelDetailsSuccess(data) {
  return {
    type: Actions.FETCH_CHANNEL_DETAILS_SUCCESS,
    payload: data,
  };
}
export function getChannelDetailsStart(accessToken, orgId, userId) {
  return {
    type: Actions.GET_CHANNELS_DETAILS,
    accessToken,
    orgId,
    userId,
  };
}
