import { getAllUsersOfOrgApi } from '../../../INTERCEPTOR';
import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getAllUsersV2 = async (orgId: string): Promise<any[]> => {
  try {
    var response = await getAllUsersOfOrgApi(orgId);
    return response?.data?.users;
  } catch (error) {
    console.warn(error);
  }
};