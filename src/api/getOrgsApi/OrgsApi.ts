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


export const fetchOrgsUnreadCountApi = async ()=>{
    try {
      const response = await spaceServerApi.get(`chat/teamUser?badgeCountByOrg=true`);
      return response;
    } catch (error) {
      console.warn(error,"fetchOrgsUnreadCountApi failed");
    }
  }

  // export const increaseOrgsUnreadCountApi = async (orgId:string,count:number)=>{
  //   try {
  //     const response = await spaceServerApi.put(`chat/teamUser?badgeCountByOrg=true`,
  //     JSON.stringify({
  //       [orgId]:count
  //     }));
  //   } catch (error) {
  //     console.warn("error updating");
  //   }
  // }