import { spaceServerApi } from '../../../INTERCEPTOR';

export const getAllUsersV2 = async (orgId: string): Promise<any[]> => {
  try {
    var response = await spaceServerApi.get(`/orgs/${orgId}?getCouponDetails=true`);
    return response?.data?.users;
  } catch (error) {
    console.warn(error);
  }
};