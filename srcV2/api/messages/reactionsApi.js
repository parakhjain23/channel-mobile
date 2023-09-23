export const reactionsApi = async (
  token,
  teamId,
  messageId,
  reaction_icon,
  reaction_name,
  userIds,
  actionType,
  userId,
) => {
  try {
    var response = await fetch(`https://api.intospace.io/chat/reactions`, {
      method: actionType == 'remove' ? 'PATCH' : 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body:
        actionType == 'remove'
          ? JSON.stringify({
              messageId: messageId,
              reaction_icon: reaction_icon,
              reaction_name: reaction_name,
              users: userIds,
            })
          : JSON.stringify({
              messageId: messageId,
              reaction_icon: reaction_icon,
              reaction_name: reaction_name,
            }),
    });
    var result = await response.json();
    return result;
  } catch (error) {
    console.warn(error);
  }
  return hi;
};
