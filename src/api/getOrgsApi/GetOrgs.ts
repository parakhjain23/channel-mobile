export const fetchOrgsApi = async (token: string): Promise<any[]> => {
    try {
      const response = await fetch('https://api.intospace.io/users?followedOrgs=true', {
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