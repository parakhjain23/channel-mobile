import {call} from 'redux-saga/effects';
import { actionType } from '../../types/actionDataType';
import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export function* notificationsV2(action: actionType<{accessToken: string, deviceId: string}>) {
  try {
    const {accessToken, deviceId} = action?.payload;
    yield call(notificationApi, accessToken, deviceId);
  } catch (error) {
    console.warn(error);
  }
}

const notificationApi = async (token:string, deviceId:string):Promise<void> => {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `${token}`);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      deviceId: {
        chat: `${deviceId}`,
      },
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${CHAT_SERVER_URL}/users/deviceGroups`, requestOptions)
      .then(async response => {
        let result = await response.json();
      })
      .catch(error => console.warn('error', error));
  } catch (error) {
    console.warn(error);
  }
};
