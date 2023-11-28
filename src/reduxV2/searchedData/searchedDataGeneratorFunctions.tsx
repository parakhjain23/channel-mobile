import { put, call } from 'redux-saga/effects';
import { actionType } from '../../types/actionDataType';
import { getChannelsByQueryApi } from '../../api/channelsApi/GetChannelsByQueryApi';
import { getChannelsByQuerySuccessV2 } from './searchedDataSlice';
import { getChannelsByQueryV2Api } from '../../api/channelsApi/GetChannelsByQueryV2Api';


export function* getChannelsByQueryV2(action: actionType<{ query: string; accessToken: string; orgId: string }>) {
    try {
        var response = yield call(getChannelsByQueryV2Api, action?.payload?.query, action?.payload?.orgId)
        yield put(getChannelsByQuerySuccessV2(response))
    } catch (error) {
        console.warn(error);
    }
}
