import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const addUsersToChannelApi = async (userIds, teamId, orgId, token) => {
  try {
    const requests = userIds.map(userId =>
      fetch(`${CHAT_SERVER_URL}/chat/teamUser`, {
        method: 'POST',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId.userId,
          teamId: teamId,
          orgId: orgId,
        }),
      }).then(response => response.json()),
    );

    const results = await Promise.all(requests);
    return results;
  } catch (error) {
    console.warn(error);
  }
};

export const removeUserFromChannelApi = async (
  userIds,
  teamId,
  orgId,
  token,
) => {
  try {
    const requests = userIds.map(userId =>
      fetch(
        `${CHAT_SERVER_URL}/chat/teamUser?orgId=${orgId}&userId=${userId.userId}&teamId=${teamId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      ).then(response => response.json()),
    );

    const results = await Promise.all(requests);
    return results;
  } catch (error) {
    console.warn(error);
  }
};
