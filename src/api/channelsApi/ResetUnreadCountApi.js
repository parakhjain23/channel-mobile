import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const resetUnreadCountApi = async (
  orgId,
  userId,
  teamId,
  accessToken,
  badgeCount,
  unreadCount,
) => {
  try {
    var response = await fetch(
      `${CHAT_SERVER_URL}/chat/teamUser?orgId=${orgId}&userId=${userId}&teamId=${teamId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unreadCount: unreadCount,
          badgeCount: badgeCount,
        }),
      },
    );
    const result = await response.json();
    return result[0];
  } catch (error) {
    console.warn(error, 'error in reset unread count api');
  }
};
