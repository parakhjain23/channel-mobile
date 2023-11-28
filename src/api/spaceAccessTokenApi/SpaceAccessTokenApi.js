import AsyncStorage from '@react-native-async-storage/async-storage';
import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getSpaceAccessTokenApi = async firebaseToken => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}/authentication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firebaseAccessToken: firebaseToken,
      }),
    });
    var result = await response.json();
    await AsyncStorage.setItem("accessToken",result.accessToken)
    return result;
  } catch (error) {
    console.warn(error);
  }
};
