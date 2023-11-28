import { getUserDetailsApi, searchUserProfileApi } from "../../../INTERCEPTOR";

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