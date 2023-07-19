import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const closeChannelApi = async (
  channelName,
  teamId,
  channelType,
  token,
) => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}/chat/team/${teamId}`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: channelType,
        name: channelName,
        isArchived: true,
      }),
    });
    var result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
};
