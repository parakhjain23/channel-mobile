import { draftMsgApi } from "../../../INTERCEPTOR";
import { CHAT_SERVER_URL } from "../baseUrls/baseUrls";

export const draftMessageApi = async (
  message: string | any,
  teamId: string,
  accessToken: string,
  orgId: string,
  userId: string
): Promise<void> => {
  try {
    await draftMsgApi(
      JSON.stringify({
        draftAttachments: [],
        draftMessage: message,
        eventType: 'DraftHistoryUpdate',
        orgId: orgId,
        teamId: teamId,
        userId: userId,
      }),
      orgId,
      userId,
      teamId 
    )
    // await fetch(
    //   `${CHAT_SERVER_URL}/chat/teamUser?orgId=${orgId}&userId=${userId}&teamId=${teamId}`,
    //   {
    //     method: 'PATCH',
    //     headers: {
    //       Authorization: accessToken,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       draftAttachments: [],
    //       draftMessage: message,
    //       eventType: 'DraftHistoryUpdate',
    //       orgId: orgId,
    //       teamId: teamId,
    //       userId: userId,
    //     }),
    //   }
    // );
  } catch (error) {
    console.warn(error);
  }
};
