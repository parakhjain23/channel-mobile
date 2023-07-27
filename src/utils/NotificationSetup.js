import React from 'react';
import {useEffect} from 'react';
import Notifee, {
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {connect} from 'react-redux';
import {setCurrentOrgId} from '../redux/actions/org/intialOrgId';

const NotificationSetup = ({
  userInfoState,
  resetUnreadCountAction,
  resetChatsAction,
}) => {
  useEffect(() => {
    if (store.getState()?.userInfoReducer?.accessToken) {
      setNotificationListeners();
      initPushNotification();
    }
  }, [userInfoState.accessToken]);
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
      const token = await messaging().getToken();
      await AsyncStorage.setItem('FCM_TOKEN', token);
      await AsyncStorage.getItem('FCM_TOKEN').then(token => {
        if (store.getState().userInfoReducer?.accessToken) {
          store.dispatch(
            subscribeToNotifications(userInfoState?.accessToken, token),
          );
        }
      });
      messaging().onTokenRefresh(async token => {
        if (token) {
          await AsyncStorage.setItem('FCM_TOKEN', token.token);
        }
      });
      messaging().onMessage(async message => {
        if (message?.data?.senderId != userInfoState.user?.id) {
          // handleNotificationFirebase(message);
          handleNotification(message, 'firebase');
          if (
            message?.data?.orgId != store?.getState()?.orgsReducer?.currentOrgId
          ) {
            await store?.dispatch(
              increaseCountOnOrgCard(
                message?.data?.orgId,
                message?.data?.teamId,
              ),
            );
          }
        }
      });
      messaging().onNotificationOpenedApp(message => {
        openChat(message, 'on messaging notification press');
      });
      messaging().setBackgroundMessageHandler(async message => {
        if (
          message?.data?.senderId != store.getState()?.userInfoReducer?.user?.id
        ) {
          handleNotification(message, 'firebase');
        }
      });
      const rMessage = await messaging().getInitialNotification();
      if (rMessage) {
        if (
          rMessage?.data?.orgId != store?.getState()?.orgsReducer?.currentOrgId
        ) {
          await store.dispatch(
            setCurrentOrgId(
              store?.getState()?.userInfoReducer?.accessToken,
              rMessage?.data?.orgId,
              store?.getState()?.userInfoReducer?.user?.id,
              store?.getState()?.userInfoReducer?.user?.displayName
                ? store?.getState()?.userInfoReducer?.user?.displayName
                : store?.getState()?.userInfoReducer?.user?.firstName,
            ),
          );
          await store.dispatch(removeCountOnOrgCard(rMessage?.data?.orgId));

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
        message?.data?.orgId != store?.getState()?.orgsReducer?.currentOrgId
      ) {
        await store.dispatch(
          setCurrentOrgId(
            store?.getState()?.userInfoReducer?.accessToken,
            message?.data?.orgId,
            store?.getState()?.userInfoReducer?.user?.id,
            store?.getState()?.userInfoReducer?.user?.displayName
              ? store?.getState()?.userInfoReducer?.user?.displayName
              : store?.getState()?.userInfoReducer?.user?.firstName,
          ),
        );
        await store.dispatch(removeCountOnOrgCard(message?.data?.orgId));

        setTimeout(() => {
          openChat(message, 'from action listiner ');
        }, 1000);
      } else {
        openChat(message, 'normal');
      }
    }
    switch (event?.detail?.pressAction?.id) {
      case 'mark_as_read':
        resetUnreadCountAction(
          event?.detail?.notification?.data?.orgId,
          userInfoState?.user?.id,
          event?.detail?.notification?.data?.teamId,
          userInfoState?.user?.accessToken,
        );
        Notifee.cancelNotification(event?.detail?.notification?.id);
        break;
      case 'reply':
        var message = event?.detail?.input;
        var teamId = event?.detail?.notification?.data?.teamId;
        var orgId = event?.detail?.notification?.data?.orgId;
        var senderId = event?.detail?.notification?.data?.senderId;
        var token = store.getState().userInfoReducer?.accessToken;
        var parentId = event?.detail?.notification?.data?.parentId;
        store.dispatch(
          sendMessageStart(message, teamId, orgId, senderId, token, parentId),
        );
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
      store.getState()?.channelsReducer?.teamIdAndTypeMapping[teamId] ==
      'DIRECT_MESSAGE'
        ? (name =
            store.getState().orgsReducer?.userIdAndDisplayNameMapping[
              message?.data?.senderId
            ])
        : (name =
            store.getState()?.channelsReducer?.teamIdAndNameMapping[teamId]);
      RootNavigation?.navigate('Chat', {
        chatHeaderTitle: name,
        teamId: teamId,
        channelType:
          store.getState()?.channelsReducer?.teamIdAndTypeMapping[teamId],
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

const mapStateToProps = state => ({
  userInfoState: state?.userInfoReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    resetUnreadCountAction: (
      currentOrgId,
      userId,
      teamId,
      accessToken,
      badgeCount,
      unreadCount,
    ) =>
      dispatch(
        resetUnreadCountStart(
          currentOrgId,
          userId,
          teamId,
          accessToken,
          badgeCount,
          unreadCount,
        ),
      ),
    resetChatsAction: () => dispatch(getChatsReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NotificationSetup);
