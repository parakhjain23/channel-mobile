import { getOrgsApi } from "../../../INTERCEPTOR";
// import { CHAT_SERVER_URL } from "../baseUrls/baseUrls";

export const fetchOrgsApi = async (): Promise<any[]> => {
    try {
      const response = await getOrgsApi();
      // await fetch(`${CHAT_SERVER_URL}/users?followedOrgs=true`, {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': token
      //   }
      // });      
      // const result = await response.json();
      return response?.data?.orgs;
    } catch (error) {
      return [];
    }
  };  