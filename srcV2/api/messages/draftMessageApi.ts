export const draftMessageApi = async (
  message: string | any,
  teamId: string,
  accessToken: string,
  orgId: string,
  userId: string
): Promise<void> => {
  try {
    await fetch(
      `https://api.intospace.io/chat/teamUser?orgId=${orgId}&userId=${userId}&teamId=${teamId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draftAttachments: [],
          draftMessage: message,
          eventType: 'DraftHistoryUpdate',
          orgId: orgId,
          teamId: teamId,
          userId: userId,
        }),
      }
    );
  } catch (error) {
    console.warn(error);
  }
};
