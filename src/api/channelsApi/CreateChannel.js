import {Alert} from 'react-native';
import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const createChannel = async (
  token,
  orgId,
  channelName,
  channelType,
  userIds,
) => {
  try {
    var response = await fetch(`${CHAT_SERVER_URL}//chat/team`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestId: '123456781',
        type: channelType,
        orgId: orgId,
        name: channelName,
        userIds: userIds,
      }),
    });
    var result = await response.json();
    if (result?.name == 'GeneralError' || result?.name == 'Conflict') {
      Alert.alert(result?.message);
    }
    return result;
  } catch (error) {
    console.warn(error);
  }
};
