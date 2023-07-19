import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getChannelByTeamIdApi = async (token, teamId) => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}/chat/team/${teamId}`, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    var result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
};
