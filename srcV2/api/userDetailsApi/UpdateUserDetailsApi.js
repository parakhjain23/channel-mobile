export const updateUserDetailsApi = async (token, userId, attachment) => {
  try {
    var response = await fetch(`https://api.intospace.io/users/${userId}`, {
      method: 'PATCH',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatarKey: attachment[0]?.key,
      }),
    });
    var result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
