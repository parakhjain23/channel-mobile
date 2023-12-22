import { delveServerApi, spaceServerApi } from '../../../INTERCEPTOR';

export const getChannelsV2Api = async (orgId:string, userId:string):Promise<any[]> => {
  try {
    var response = await spaceServerApi.get(`/chat/team?orgId=${orgId}&$paginate=false&includeUsers=false&userIds=${userId}`);
    return response?.data;
  } catch (error) {
    console.warn(error);
  }
};


export const getRecentChannelsV2Api = async (orgId:string, userId:string):Promise<any[]> => {
  try {
    var response = await spaceServerApi.get(`/chat/teamUser?$sort[lastUpdatedAt]=-1&orgId=${orgId}&userId=${userId}&$paginate=false`);
    return response?.data;
  } catch (error) {
    console.warn(error);
  }
};


export const getChannelsByQueryV2Api = async (query:string, orgId:string):Promise<any[]> => {
  try {
    var response = await delveServerApi.post(`/search/prod-space?query=${query}&API_KEY=TmkzBMbr3Z1eiLjMOQ0kqhqp4f0GVCzR1w&size=15&`,
        JSON.stringify({
            terms: {
            type: ['U', 'T'],
            orgId: [orgId],
            },
            scoreMultiplier: {
            type: {
                values: ['U'],
                weight: 2,
            },
            isEnabled: {
                values: [false],
                weight: 0.25,
            },
            isArchived: {
                values: [true],
                weight: 0.25,
            },
            },
        }))
    if (response?.data?.hits?.hits) {
      return response?.data?.hits?.hits;
    } else {
      return [];
    }
  } catch (error) {
    console.warn(error);
  }
};

export const resetUnreadCountV2Api = async (orgId:string, userId:string, teamId:string, badgeCount:number, unreadCount: number):Promise<any[]> => {
  try {
    console.log("api pr data-->",badgeCount,"fff  un",unreadCount, "==oid ",orgId,"user ",userId,"team-",teamId);
    
    var response = await spaceServerApi.patch(`/chat/teamUser?orgId=${orgId}&userId=${userId}&teamId=${teamId}`,
      JSON.stringify({
          unreadCount: unreadCount,
          badgeCount: badgeCount,
      }));
    const result = response?.data;
    return result[0];
  } catch (error) {
    console.warn(error, 'error in reset unread count api');
  }
}