import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getUserDetailsApi = async token => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}/users?getCurrentUser=true`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    var result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
};
export const searchUserProfileApi = async (userId, token) => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });
    var result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
};
