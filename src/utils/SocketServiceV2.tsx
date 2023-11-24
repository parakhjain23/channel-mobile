import { channelPatchedEvent } from '../redux/actions/channels/ChannelPatchedEvent';
import {
  increaseUnreadCount,
  moveChannelToTop,
} from '../redux/actions/channels/ChannelsAction';
import { closeChannelSuccess } from '../redux/actions/channels/CloseChannelActions';
import { createNewChannelSuccess } from '../redux/actions/channels/CreateNewChannelAction';
import { getChannelByTeamIdStart } from '../redux/actions/channels/GetChannelByTeamId';
import { addNewMessage } from '../redux/actions/chat/ChatActions';
import { messageEditSuccess } from '../redux/actions/chat/ChatUpdateActions';
import { deleteMessageSuccess } from '../redux/actions/chat/DeleteChatAction';
import { newUserJoinedAOrg } from '../redux/actions/org/GetAllUsersOfOrg';
import { socketStatus } from '../redux/actions/socket/socketActions';
import { store } from '../redux/Store';
import { addNewMessageV2 } from '../reduxV2/chats/chatsSlice';
import { $ReduxCoreType } from '../types/reduxCoreType';
import { useCustomSelector } from './deepCheckSelector';
import { handleNotification } from './HandleNotification';
import { createSocket } from './Socket';
import { PlayLocalSoundFile } from './Sounds';

const SocketServiceV2 = (socket, dispatch, accessToken, currentOrgId, channels, allUsers) => {

  // const { channels} = useCustomSelector((state: $ReduxCoreType) => ({
  //     channels : state?.channels
  //   }))

  socket.on('reconnect', function () {
    createSocket(accessToken, currentOrgId);
  });
  socket.on('connect', () => {
    dispatch(socketStatus(true));
  });
  socket.on('disconnect', () => {
    dispatch(socketStatus(false));
  });
  socket.on('chat/message created', data => {
    if (
      channels?.teamIdAndDataMapping[data?.teamId] ==
      undefined
    ) {
      dispatch(
        getChannelByTeamIdStart(
          accessToken,
          data?.teamId,
          allUsers?.currentUser?.id
        ),
      );
    }
    var newData = data;
    if (!('isActivity' in newData)) {
      newData.isActivity = false;
    }
    dispatch(
      //   addNewMessage(newData, allUsers?.currentUser?.id),
      addNewMessageV2({
        teamId: newData?.teamId,
        message: newData,
        parentMessage: newData?.parentMessage,
        userid: allUsers?.currentUser?.id,
      })
    );
    newData?.content == 'closed this channel' && newData?.isActivity
      ? null
      : channels?.activeChannelTeamId !=
        newData?.teamId
        ? (channels?.recentChannels?.[0]?._id !=
          newData?.teamId &&
          store.dispatch(
            moveChannelToTop(
              [newData?.teamId],
              newData?.senderId,
              allUsers?.currentUser?.id,
            ),
          ),
          store.dispatch(
            increaseUnreadCount(
              [newData?.teamId],
              newData?.senderId,
              allUsers?.currentUser?.id,
            ),
          ))
        : channels?.recentChannels?.[0]?._id !=
        newData?.teamId &&
        store.dispatch(
          moveChannelToTop(
            [newData?.teamId],
            newData?.senderId,
            allUsers?.currentUser?.id,
          ),
        );
    if (newData?.senderId != allUsers?.currentUser?.id) {
      PlayLocalSoundFile();
      if (
        newData?.teamId !=
        channels?.activeChannelTeamId
      ) {
        // handleNotification(
        //   newData,
        //   'events',
        //   store.getState()?.orgsReducer?.userIdAndDisplayNameMapping,
        // );
      }
    }
  });
  //   socket.on('chat/message patched', data => {
  //     if (data?.deleted) {
  //       store.dispatch(deleteMessageSuccess(data));
  //     }
  //     var newData = data;
  //     if (
  //       newData?.attachment[0]?.contentType?.includes('audio') &&
  //       data?.attachment[0]?.transcription != undefined
  //     ) {
  //       newData.content = data?.attachment[0]?.transcription;
  //     }
  //     store.dispatch(messageEditSuccess(newData));
  //   });

  //   socket.on('chat/team updated', data => {
  //     if (data?.isArchived) {
  //       store.dispatch(closeChannelSuccess(data?._id));
  //     }
  //   });
  //   socket.on('chat/team patched', data => {
  //     store.dispatch(channelPatchedEvent(data));
  //   });
  //   socket.on('chat/team created', data => {
  //     if (data?.userIds?.includes(store.getState()?.userInfoReducer?.user?.id)) {
  //       store.dispatch(
  //         createNewChannelSuccess(
  //           data,
  //           store.getState()?.userInfoReducer?.user?.id,
  //         ),
  //       );
  //       store.dispatch(moveChannelToTop([data?._id]));
  //     }
  //   });

  //   socket.on('orgUser created', data => {
  //     store.dispatch(newUserJoinedAOrg(data));
  //   });
};
export default SocketServiceV2;
