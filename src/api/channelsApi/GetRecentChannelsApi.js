import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getRecenctChannelsApi = async (token, orgId, userId) => {
  try {
    var response = await fetch(
      `${CHAT_SERVER_URL}/chat/teamUser?$sort[lastUpdatedAt]=-1&orgId=${orgId}&userId=${userId}&$paginate=false`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
};
