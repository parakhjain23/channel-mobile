import { spaceServerApi } from "../../../INTERCEPTOR";

export const getUserDetailsV2Api = async ():Promise<any[]> => {
    try {
      var response = await getUserDetailsApi();
      return response?.data;
    } catch (error) {
      console.warn(error);
    }
  };


// export const searchUserProfileV2Api = async ( userId:string ) => {
//   try {
//     var response = await searchUserProfileApi(userId);
//     return response?.data;
//   } catch (error) {
//     console.warn(error);
//   }
// };


const getUserDetailsApi = () => {
  return spaceServerApi.get(`/users?getCurrentUser=true`);
}

// future use 
// const searchUserProfileApi = (userId:string) => {
//   return spaceServerApi.get(`/users/${userId}`);
// }