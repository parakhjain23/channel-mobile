import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getChannelsApi = async (token, orgId, userId) => {
  try {
    var response = await fetch(
      `${CHAT_SERVER_URL}/chat/team?orgId=${orgId}&$paginate=false&includeUsers=false&userIds=${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
};
