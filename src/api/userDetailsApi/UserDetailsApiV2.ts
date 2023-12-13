import { spaceServerApi } from "../../../INTERCEPTOR";

export const getUserDetailsV2Api = async ():Promise<any[]> => {
    try {
      var response = await spaceServerApi.get(`/users?getCurrentUser=true`);
      return response?.data;
    } catch (error) {
      console.warn(error);
    }
  };


// export const searchUserProfileV2Api = async ( userId:string ) => {
//   try {
//     var response = await spaceServerApi.get(`/users/${userId}`);
//     return response?.data;
//   } catch (error) {
//     console.warn(error);
//   }
// };