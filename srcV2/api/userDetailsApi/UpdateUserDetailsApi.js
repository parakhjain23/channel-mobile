import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const updateUserDetailsApi = async (token, userId, attachment) => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatarKey: attachment[0]?.key,
      }),
    });
    var result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
