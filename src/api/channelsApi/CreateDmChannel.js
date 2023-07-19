import {Alert} from 'react-native';
import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const createDmChannel = async (
  token,
  orgId,
  channelName,
  reciverUserId,
) => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}/chat/team`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: '123456781',
        type: 'DIRECT_MESSAGE',
        orgId: orgId,
        userId: reciverUserId,
      }),
    });
    var result = await response.json();
    if (result?.name == 'GeneralError' || result?.name == 'Conflict') {
    }
    return result;
  } catch (error) {
    console.warn(error);
  }
};
