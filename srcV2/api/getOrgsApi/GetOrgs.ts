import { CHAT_SERVER_URL } from "../baseUrls/baseUrls";

export const fetchOrgsApi = async (token: string): Promise<any[]> => {
    try {
      const response = await fetch(`${CHAT_SERVER_URL}/users?followedOrgs=true`, {
        method: 'GET',
        headers: {
          'Authorization': token
        }
      });
  
      const result = await response.json();
      return result?.orgs;
    } catch (error) {
      return [];
    }
  };  