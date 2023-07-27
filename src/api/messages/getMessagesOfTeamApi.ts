import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getMessagesOfTeamApi = async (
  teamId: string,
  token: string,
  skip: number,
): Promise<any> => {
  try {
    var response = await fetch(
      `${CHAT_SERVER_URL}/chat//message?teamId=${teamId}&deleted=false&$limit=30&$paginate=false&parentMessages=true&$skip=${skip}`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );
    var result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
};
