import {channelPatchedEvent} from '../redux/actions/channels/ChannelPatchedEvent';
import {
  increaseUnreadCount,
  moveChannelToTop,
} from '../redux/actions/channels/ChannelsAction';
import {closeChannelSuccess} from '../redux/actions/channels/CloseChannelActions';
import {createNewChannelSuccess} from '../redux/actions/channels/CreateNewChannelAction';
import {getChannelByTeamIdStart} from '../redux/actions/channels/GetChannelByTeamId';
import {addNewMessage} from '../redux/actions/chat/ChatActions';
import {messageEditSuccess} from '../redux/actions/chat/ChatUpdateActions';
import {deleteMessageSuccess} from '../redux/actions/chat/DeleteChatAction';
import {newUserJoinedAOrg} from '../redux/actions/org/GetAllUsersOfOrg';
import {socketStatus} from '../redux/actions/socket/socketActions';
import {store} from '../redux/Store';
import {handleNotificationFromEvents} from './HandleNotification';
import {createSocket} from './Socket';
import {PlayLocalSoundFile} from './Sounds';

const SocketService = socket => {
  const {userInfoReducer, orgsReducer, channelsReducer} = store.getState();
  const currentUserId = userInfoReducer?.user?.id;
  const accessToken = userInfoReducer?.accessToken;
  socket.on('reconnect', function () {
    createSocket(accessToken, orgsReducer?.currentOrgId);
  });
  socket.on('connect', () => {
    store.dispatch(socketStatus(true));
  });
  socket.on('disconnect', () => {
    store.dispatch(socketStatus(false));
  });
  socket.on('chat/message created', data => {
    console.log(data, 'this is message created event');
    if (channelsReducer?.teamIdAndTypeMapping[data?.teamId] == undefined) {
      store.dispatch(
        getChannelByTeamIdStart(accessToken, data?.teamId, currentUserId),
      );
    }
    var newData = data;
    if (!('isActivity' in newData)) {
      newData.isActivity = false;
    }
    store.dispatch(addNewMessage(newData, currentUserId));
    newData?.content == 'closed this channel' && newData?.isActivity
      ? null
      : channelsReducer?.activeChannelTeamId != newData?.teamId
      ? (channelsReducer?.recentChannels?.[0]?._id != newData?.teamId &&
          store.dispatch(
            moveChannelToTop(
              [newData?.teamId],
              newData?.senderId,
              currentUserId,
            ),
          ),
        store.dispatch(
          increaseUnreadCount(
            [newData?.teamId],
            newData?.senderId,
            currentUserId,
          ),
        ))
      : channelsReducer?.recentChannels?.[0]?._id != newData?.teamId &&
        store.dispatch(
          moveChannelToTop([newData?.teamId], newData?.senderId, currentUserId),
        );
    if (newData?.senderId != currentUserId) {
      PlayLocalSoundFile();
      if (newData?.teamId != channelsReducer?.activeChannelTeamId) {
        handleNotificationFromEvents(
          newData,
          orgsReducer?.userIdAndDisplayNameMapping,
        );
      }
    }
  });
  socket.on('chat/message patched', data => {
    if (data?.deleted) {
      store.dispatch(deleteMessageSuccess(data));
    }
    var newData = data;
    if (
      newData?.attachment[0]?.contentType?.includes('audio') &&
      data?.attachment[0]?.transcription != undefined
    ) {
      newData.content = data?.attachment[0]?.transcription;
    }
    store.dispatch(messageEditSuccess(newData));
  });

  socket.on('chat/team updated', data => {
    if (data?.isArchived) {
      store.dispatch(closeChannelSuccess(data?._id));
    }
  });
  socket.on('chat/team patched', data => {
    store.dispatch(channelPatchedEvent(data));
  });
  socket.on('chat/team created', data => {
    if (data?.userIds?.includes(currentUserId)) {
      store.dispatch(createNewChannelSuccess(data, currentUserId));
      store.dispatch(moveChannelToTop([data?._id]));
    }
  });

  socket.on('orgUser created', data => {
    store.dispatch(newUserJoinedAOrg(data));
  });
};
export default SocketService;
