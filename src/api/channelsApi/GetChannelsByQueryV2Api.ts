// import { getChannelsByQueryApi } from '../../../INTERCEPTOR';
// export const getChannelsByQueryV2Api = async (query:string, orgId:string):Promise<any[]> => {
//   try {
//     var response = await getChannelsByQueryApi(
//         JSON.stringify({
//             terms: {
//             type: ['U', 'T'],
//             orgId: [orgId],
//             },
//             scoreMultiplier: {
//             type: {
//                 values: ['U'],
//                 weight: 2,
//             },
//             isEnabled: {
//                 values: [false],
//                 weight: 0.25,
//             },
//             isArchived: {
//                 values: [true],
//                 weight: 0.25,
//             },
//             },
//         }),
//         query
//     );
//     if (response?.data?.hits?.hits) {
//       return response?.data?.hits?.hits;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.warn(error);
//   }
// };
