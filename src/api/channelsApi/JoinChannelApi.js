import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const joinChannelApi = async (orgId, teamId, userId, token) => {
  try {
    const date = new Date();
    var response = await fetch(`${CHAT_SERVER_URL}/chat/teamUser`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orgId: orgId,
        teamId: teamId,
        userId: userId,
      }),
    });
    var result = await response.json();
    var response2 = await fetch(
      `${CHAT_SERVER_URL}/chat/teamUser?orgId=${orgId}&userId=${userId}&teamId=${teamId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lastUpdatedAt: date,
        }),
      },
    );
    var result2 = await response2.json();
    return result2;
    return result;
  } catch (error) {
    console.warn(error);
  }
};
