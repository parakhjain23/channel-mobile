import { spaceServerApi } from '../../../INTERCEPTOR';

export const getAllUsersV2 = async (orgId: string): Promise<any[]> => {
  try {
    var response = await getAllUsersOfOrgApi(orgId);
    return response?.data?.users;
  } catch (error) {
    console.warn(error);
  }
};

//interceptor end points
const getAllUsersOfOrgApi = (orgId:string) => {
  return spaceServerApi.get(`/orgs/${orgId}?getCouponDetails=true`);
}