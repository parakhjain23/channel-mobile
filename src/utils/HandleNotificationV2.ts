import Notifee, {AndroidImportance} from '@notifee/react-native';
// import {store} from '../redux/Store';
import { store } from '../reduxV2/store';
import cheerio, {text} from 'cheerio';
import uuid from 'react-native-uuid';
import { messagesType } from '../types/ChatsReducerType';
import { $ReduxCoreType } from '../types/reduxCoreType';


const getStoreState = () => {
    const {orgs, channels, allUsers} = store?.getState();
    return {orgs, channels, allUsers};
}

export const handleNotificationV2 = async (
  data:messagesType,
  notificationType:string,
  displayName:string,
) => {
  var title;
  var body;
  var modifiedData;

  const {orgs, channels, allUsers} = getStoreState();
  if (notificationType == 'firebase') {
    title = data?.notification?.title;
    body = data?.notification?.body;
    modifiedData = data.data;
    if (data?.data?.orgId != orgs?.currentOrgId) {
      title = `New Message in ${
        orgs?.orgIdAndDataMapping?.[data?.data?.orgId]?.name
      }`;
      body = data?.notification?.title + ' : ' + data?.notification?.body;
    }
  } else {
    data['openChannel'] = `${data?.openChannel}`;
    data['sameSender'] = `${data?.sameSender}`;
    data['isSameDate'] = `${data?.isSameDate}`;
    data['isActivity'] =
      data?.isActivity != undefined ? `${data?.isActivity}` : 'false';
    data['mentions'] = `${data?.mentions}`;
    data['showInMainConversation'] = `${data?.showInMainConversation}`;
    data['isLink'] = `${data?.isLink}`;
    data['parentId'] == null
      ? delete data['parentId']
      : (data['parentId'] = `${data?.parentId}`);
    if (data?.mentions?.length > 0) {
      var resultStr = '';
      const $ = cheerio.load(`<div>${data?.content}</div>`);
      $('span[contenteditable="false"]').remove();
      $('*')
        .contents()
        .each((index, element) => {
          if (element.type === 'text') {
            const message = $(element).text().trim();
            if (message !== '') {
              resultStr += message + ' ';
            }
          } else if ($(element).is('span')) {
            resultStr +=
              $(element)?.attr('data-denotation-char') +
              $(element)?.attr('data-id') +
              ' ';
          }
        });
      resultStr = resultStr.trim();
      resultStr = resultStr.replace(/@{1,2}(\w+)/g, (match) => {
        return displayName
          ? `@${displayName}`
          : match;
      });
      data['content'] = resultStr;
    }
    if (data?.attachment?.length > 0) {
      if (data?.attachment[0]?.title?.includes('sound')) {
        data['content'] = 'sent a Voice note';
      } else {
        data['content'] = 'Shared an Attachment';
      }
    }
    data['attachment'] =
      data?.attachment != undefined ? JSON.stringify(data?.attachment) : `[]`;
    var channelType =
      channels?.teamIdAndDataMapping?.[data?.teamId]?.type;
    title;
    body;
    var activityContent;
    if (channelType == 'DIRECT_MESSAGE') {
      title =
        allUsers?.userIdAndDataMapping?.[data?.senderId]?.displayName;
      if (data['isActivity'] == 'true') {
        const regex = /\{\{(\w+)\}\}/g;
        activityContent = data?.content?.replace(regex, (match, userId) => {
          return (
            allUsers?.userIdAndDataMapping?.[userId]?.displayName ||
            match
          ); // return the name if it exists, or the original match if not
        });
        body = activityContent;
      } else {
        body = data?.content;
      }
    } else {
      title =
        channels?.teamIdAndDataMapping?.[data?.teamId]?.name;
      if (data['isActivity'] == 'true') {
        const regex = /\{\{(\w+)\}\}/g;
        activityContent = data?.content?.replace(regex, (match, userId) => {
          return (
            allUsers?.userIdAndDataMapping?.[userId]?.displayName ||
            match
          ); // return the name if it exists, or the original match if not
        });
        body =
          allUsers?.userIdAndDataMapping?.[data.senderId]?.displayName +
          ' : ' +
          activityContent;
      } else {
        body =
          allUsers?.userIdAndDataMapping?.[data.senderId]?.displayName +
          ' : ' +
          data?.content;
      }
    }
    modifiedData = data;
  }

  await Notifee.displayNotification({
    title: title,
    body: body,
    id: uuid.v1(),
    data: modifiedData,
    android: {
      channelId: 'foreground',
      // smallIcon: '@mipmap/ic_launcher',
      largeIcon: require('../assests/images/appIcon/icon.png'),
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
        launchActivity: 'default',
      },
      actions: [
        {
          title: 'Mark as Read',
          pressAction: {
            id: 'mark_as_read',
          },
        },
        {
          title: 'Reply',
          pressAction: {
            id: 'reply',
          },
          input: true,
        },
      ],
    },
    ios: {
      // attachments: [
      //   {
      //     url: 'https://s3.ap-south-1.amazonaws.com/walkover.things-of-brand.assets/2b4c042bbe9ec62b13f698f163434389',
      //     identifier: 'mark_as_read',
      //     title: 'Mark as Read',
      //     options: {
      //       type: 'default',
      //     },
      //   },
      //   {
      //     url: 'https://s3.ap-south-1.amazonaws.com/walkover.things-of-brand.assets/2b4c042bbe9ec62b13f698f163434389',
      //     identifier: 'reply',
      //     title: 'Reply',
      //     options: {
      //       type: 'destructive',
      //     },
      //   },
      // ],
      categoryId: 'channel',
    },
  });
};
