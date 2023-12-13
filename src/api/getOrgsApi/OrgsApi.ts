import { spaceServerApi } from "../../../INTERCEPTOR";
export const fetchOrgsApi = async (): Promise<any[]> => {
    try {
      const response = await spaceServerApi.get(`/users?followedOrgs=true`);
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

