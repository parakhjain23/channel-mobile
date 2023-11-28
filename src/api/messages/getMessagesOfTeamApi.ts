import { getMsgOfTeamApi } from '../../../INTERCEPTOR';
import { CHAT_SERVER_URL } from '../baseUrls/baseUrls';

export const getMessagesOfTeamApi = async (
  teamId: string,
  skip: number,
): Promise<any[]> => {
  try {
    var response = await getMsgOfTeamApi(teamId,skip)
    // await fetch(
    //   `${CHAT_SERVER_URL}/chat//message?teamId=${teamId}&deleted=false&$limit=30&$paginate=false&parentMessages=true&$skip=${skip}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       Authorization: token,
    //     },
    //   },
    // );
    // var result = await response.json();
    // console.log("api interceptor ",response.data);
    return response?.data;
  } catch (error) {
    console.warn(error);
  }
};
