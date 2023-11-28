import { getChannelsApi } from '../../../INTERCEPTOR';
import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getChannelsV2Api = async (orgId:string, userId:string):Promise<any[]> => {
  try {
    var response = await getChannelsApi(orgId, userId); 
    return response?.data;
  } catch (error) {
    console.warn(error);
  }
};