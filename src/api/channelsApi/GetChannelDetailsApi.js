import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getChannelDetailsApi = async (token, orgId, userId) => {
  try {
    var response = await fetch(
      `${CHAT_SERVER_URL}/chat/teamUser?$sort[lastUpdatedAt]=-1&$paginate=false&orgId=${orgId}&userId=${userId}`,
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
