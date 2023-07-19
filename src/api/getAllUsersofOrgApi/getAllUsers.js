import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

export const getAllUsersOfOrgApi = async (token, orgId) => {
  try {
    var response = await fetch(
      `${CHAT_SERVER_URL}/orgs/${orgId}?getCouponDetails=true`,
      {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      },
    );
    var result = await response.json();
    return result?.users;
  } catch (error) {
    console.warn(error);
  }
};
