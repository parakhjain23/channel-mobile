import React from 'react';
import {useEffect} from 'react';
import Notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {subscribeToNotifications} from '../redux/actions/socket/socketActions';
import {store} from '../redux/Store';
import {handleNotification} from './HandleNotification';
import * as RootNavigation from '../navigation/RootNavigation';
import {
  getChatsReset,
  sendMessageStart,
} from '../redux/actions/chat/ChatActions';
import {Alert, Platform} from 'react-native';
import {switchOrgStart} from '../redux/actions/org/changeCurrentOrg';
import {
  increaseCountOnOrgCard,
  removeCountOnOrgCard,
} from '../redux/actions/org/UnreadCountOnOrgCardsAction';
import {
  moveChannelToTop,
  resetUnreadCountStart,
} from '../redux/actions/channels/ChannelsAction';
import {connect, useDispatch} from 'react-redux';
import {setCurrentOrgId} from '../redux/actions/org/intialOrgId';
import {storage} from '../redux/reducers/Index';
import { useCustomSelector } from './deepCheckSelector';
import { $ReduxCoreType } from '../types/reduxCoreType';
import { subscribeToNotificationsV2 } from '../reduxV2/appInfo/appInfoSlice';
import { handleNotificationV2 } from './HandleNotificationV2';
import { sendMessageStartV2 } from '../reduxV2/chats/chatsSlice';

export const NotificationSetupV2 = ({
//   userInfoState,
//   resetUnreadCountAction,
//   resetChatsAction,
}) => {
  const { accessToken, userInfoState, orgInfoState, teamIdAndDataMapping, userIdAndDataMapping }= useCustomSelector((state:$ReduxCoreType) => ({
    accessToken : state?.appInfo?.accessToken,
    userInfoState : state?.allUsers?.currentUser,
    orgInfoState : state?.orgs,
    teamIdAndDataMapping : state?.channels?.teamIdAndDataMapping,
    userIdAndDataMapping : state?.allUsers?.userIdAndDataMapping
  })) 
  useEffect(() => {
    if (accessToken) {
      setNotificationListeners();
      initPushNotification();
    }
  }, [accessToken]);
  const dispatch = useDispatch();
  const initPushNotification = async () => {
    try {
      await Notifee.requestPermission();
      const categories = [
        {
          id: 'channel',
          actions: [
            {
              id: 'mark_as_read',
              title: 'Mark as Read',
              options: {
                foreground: true,
                authenticationRequired: false,
                destructive: false,
              },
            },
            {
              id: 'reply',
              title: 'Reply',
              input: true,
              options: {
                foreground: true,
                authenticationRequired: false,
                destructive: true,
              },
              textInput: {
                buttonTitle: 'Send',
                placeholder: 'Type a message',
              },
            },
          ],
        },
      ];
      Platform.OS == 'ios' && Notifee.setNotificationCategories(categories);
      await Notifee.createChannel({
        id: 'fcm_channel',
        importance: AndroidImportance.HIGH,
        name: 'fcm_channel',
        lights: true,
        sound: 'default',
        vibration: true,
        visibility: AndroidVisibility.PUBLIC,
      });
      const isPresent = await Notifee.isChannelCreated('foreground');
      if (!isPresent) {
        await Notifee.createChannel({
          id: 'foreground',
          importance: AndroidImportance.HIGH,
          name: 'foreground',
          lights: true,
          sound: 'default',
          vibration: true,
          visibility: AndroidVisibility.PUBLIC,
        });
      }
    } catch (error) {}
  };
  const setNotificationListeners = async () => {
    try {
      // const dispatch=useDispatch();
      const token = await messaging().getToken();
      await storage.set('FCM_TOKEN', token);
      const FCM_TOKEN = await storage.getString('FCM_TOKEN');
      if (accessToken) {
        (
          dispatch(subscribeToNotificationsV2({accessToken, deviceId:FCM_TOKEN}))
        );
      }
      // });
      messaging().onTokenRefresh(async token => {
        if (token) {
          await storage.set('FCM_TOKEN', token.token);
        }
      });
      messaging().onMessage(async message => {
        if (message?.data?.senderId != userInfoState?.id) {
          // handleNotificationFirebase(message);
          
          handleNotificationV2(message, 'firebase');
          if (
            message?.data?.orgId != orgInfoState?.currentOrgId
          ) {
            
            // await store?.dispatch(
            //   increaseCountOnOrgCard(
            //     message?.data?.orgId,
            //     message?.data?.teamId,
            //   ),
            // );
          }
        }
      });
      messaging().onNotificationOpenedApp(message => {
        openChat(message, 'on messaging notification press');
      });
      messaging().setBackgroundMessageHandler(async message => {
        if (
          message?.data?.senderId != userInfoState?.id
        ) {
          handleNotificationV2(message, 'firebase');
        }
      });
      const rMessage = await messaging().getInitialNotification();
      if (rMessage) {
        if (
          rMessage?.data?.orgId != orgInfoState?.currentOrgId
        ) {
          // await store.dispatch(
          //   setCurrentOrgId(
          //     store?.getState()?.userInfoReducer?.accessToken,
          //     rMessage?.data?.orgId,
          //     store?.getState()?.userInfoReducer?.user?.id,
          //     store?.getState()?.userInfoReducer?.user?.displayName
          //       ? store?.getState()?.userInfoReducer?.user?.displayName
          //       : store?.getState()?.userInfoReducer?.user?.firstName,
          //   ),
          // );
          // await store.dispatch(removeCountOnOrgCard(rMessage?.data?.orgId));

          setTimeout(() => {
            openChat(rMessage, 'RMESSAGE SWITCH ORG ');
          }, 2200);
        } else {
          setTimeout(() => {
            openChat(rMessage, 'RMESSAGE NORMAL');
          }, 2000);
        }
      }

      Notifee.onForegroundEvent(actionListeners);
      Notifee.onBackgroundEvent(actionListeners);
    } catch (error) {
      console.warn(error, 'error');
    }
  };
  const actionListeners = async event => {
    if (event?.type == 1) {
      const message = event?.detail?.notification;
      if (
        message?.data?.orgId != orgInfoState?.currentOrgId
      ) {
        // await store.dispatch(
        //   setCurrentOrgId(
        //     store?.getState()?.userInfoReducer?.accessToken,
        //     message?.data?.orgId,
        //     store?.getState()?.userInfoReducer?.user?.id,
        //     store?.getState()?.userInfoReducer?.user?.displayName
        //       ? store?.getState()?.userInfoReducer?.user?.displayName
        //       : store?.getState()?.userInfoReducer?.user?.firstName,
        //   ),
        // );
        // await store.dispatch(removeCountOnOrgCard(message?.data?.orgId));

        setTimeout(() => {
          openChat(message, 'from action listiner ');
        }, 1000);
      } else {
        openChat(message, 'normal');
      }
    }
    switch (event?.detail?.pressAction?.id) {
      case 'mark_as_read':
        // resetUnreadCountAction(
        //   event?.detail?.notification?.data?.orgId,
        //   userInfoState?.user?.id,
        //   event?.detail?.notification?.data?.teamId,
        //   userInfoState?.user?.accessToken,
        // );
        Notifee.cancelNotification(event?.detail?.notification?.id);
        break;
      case 'reply':
        var message = event?.detail?.input;
        var teamId = event?.detail?.notification?.data?.teamId;
        var orgId = event?.detail?.notification?.data?.orgId;
        var senderId = event?.detail?.notification?.data?.senderId;
        // var token = store.getState().userInfoReducer?.accessToken;
        var parentId = event?.detail?.notification?.data?.parentId;
        var data={
          content:message,
          teamId:teamId,
          orgId:orgId,
          senderId:senderId,
          accessToken:accessToken,
          parentId:parentId
        }
        // store.dispatch(
        //   sendMessageStart(message, teamId, orgId, senderId, token, parentId),
        // );
        dispatch(sendMessageStartV2({data,type: "ADD_LOCAL_MESSAGE"}));
        Notifee.cancelNotification(event?.detail?.notification?.id);
        break;
      default:
        break;
    }
  };
  const openChat = async (message, text = '') => {
    try {
      var teamId = message?.data?.teamId;
      var name = null;
      teamIdAndDataMapping?.[teamId]?.type ==
      'DIRECT_MESSAGE'
        ? (name =
            userIdAndDataMapping?.[
              message?.data?.senderId
            ]?.displayName)
        : (name =
            teamIdAndDataMapping?.[teamId]?.name);
      RootNavigation?.navigate('Chat', {
        chatHeaderTitle: name,
        teamId: teamId,
        channelType:
          teamIdAndDataMapping?.[teamId]?.type,
        userId: message?.data?.senderId,
        reciverUserId: message?.data?.senderId,
      });
    } catch (error) {
      console.warn(error);
    }
  };
  return null;
};
// export default NotificationSetup;

// const mapStateToProps = state => ({
//   userInfoState: state?.userInfoReducer,
// });
// const mapDispatchToProps = dispatch => {
//   return {
//     resetUnreadCountAction: (
//       currentOrgId,
//       userId,
//       teamId,
//       accessToken,
//       badgeCount,
//       unreadCount,
//     ) =>
//       dispatch(
//         resetUnreadCountStart(
//           currentOrgId,
//           userId,
//           teamId,
//           accessToken,
//           badgeCount,
//           unreadCount,
//         ),
//       ),
//     resetChatsAction: () => dispatch(getChatsReset()),
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(NotificationSetup);
