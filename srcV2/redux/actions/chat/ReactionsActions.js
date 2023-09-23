import {call, put} from 'redux-saga/effects';
import * as Actions from '../../Enums';
import {reactionsApi} from '../../../api/messages/reactionsApi';
export function* reactionOnChat({
  token,
  teamId,
  messageId,
  reaction_icon,
  reaction_name,
  userIds,
  actionType,
  userId,
}) {
  try {
    yield call(
      reactionsApi,
      token,
      teamId,
      messageId,
      reaction_icon,
      reaction_name,
      userIds,
      actionType,
      userId,
    );
  } catch (error) {
    console.warn(error);
  }
}

export function reactionOnChatStart(
  token,
  teamId,
  messageId,
  reaction_icon,
  reaction_name,
  userIds,
  actionType,
  userId,
) {
  return {
    type: Actions.REACTIONS_START,
    token,
    teamId,
    messageId,
    reaction_icon,
    reaction_name,
    userIds,
    actionType,
    userId,
  };
}
