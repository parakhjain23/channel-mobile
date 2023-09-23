import { CHAT_SERVER_URL } from "../baseUrls/baseUrls";

export const deleteMessageApi = async (token: string, msgId: string | number): Promise<any> => {
    try {
      const response = await fetch(`${CHAT_SERVER_URL}/chat/message/${msgId}`, {
        method: 'PATCH',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deleted: true,
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.warn(error);
    }
  };
  