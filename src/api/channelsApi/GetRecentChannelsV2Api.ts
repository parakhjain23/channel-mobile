import { getRecenctChannelsApi } from '../../../INTERCEPTOR';

export const getRecenctChannelsV2Api = async (orgId:string, userId:string):Promise<any[]> => {
  try {
    var response = await getRecenctChannelsApi(orgId, userId);
    return response?.data;
  } catch (error) {
    console.warn(error);
  }
};