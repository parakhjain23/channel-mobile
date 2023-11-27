import base64 from 'react-native-base64';
import { useSelector } from 'react-redux';
import { select } from 'redux-saga/effects';
import { messagesType } from '../../types/ChatsReducerType';
import { $ReduxCoreType } from '../../types/reduxCoreType';
import {CHAT_SERVER_URL} from '../baseUrls/baseUrls';

function mentionHTML(userId, teamId, type, match, username, mentionsArrToSend) {
  if (username == 'channel') {
    return `<span class=\"mention\" data-index=\"0\" data-denotation-char=\"@\" data-id=\"@all\" data-username=\"channel\" data-value=\"channel\" data-identifier=\"@all\">﻿<span contenteditable=\"false\"><span class=\"ql-mention-denotation-char\">@</span>channel</span>﻿</span>`;
  } else if (type == 'U') {
    const base64UserId = base64.encode(userId);
    mentionsArrToSend?.push(userId);
    return `<span class=\"mention\" data-index=\"2\" data-denotation-char=\"@\" data-id=\"${userId}\" data-username=\"${username}\" data-value=\"${username}\"><span contenteditable=\"false\">[${match}](MENTION-${base64UserId})</span></span>`;
  } else {
    const base64TeamId = base64.encode(teamId);
    return `<span class=\"mention\" data-index=\"4\" data-denotation-char=\"@\" data-id=\"${teamId}\" data-value=\"${username}\">﻿<span contenteditable=\"false\">[${match}](MENTION-CHANNEL-${base64TeamId})</span>﻿</span>`;
  }
}

const renderTextWithBreaks = text => {
  const htmlString = text.replace(/\n/g, '<br/>');
  return htmlString;
};

export const sendMessageApiV2 = async (
  data:messagesType
) => {
  let mentionsArrToSend = [];
  try {
    const regex = /(https?:\/\/[^\s]+)/g;
    data?.content.replace(regex, '<a href="$1">$1</a>');
    const mentionRegex = /@(\w+)/g;
    // Replace mentions with HTML tags

    let mentionIndex = 0;
    if (data?.mentionsArr?.length > 0) {
      data?.content?.replace(mentionRegex, (match, username) => {
        const mentionHtml = mentionHTML(
          data?.mentionsArr[mentionIndex]?.userId,
          data?.mentionsArr[mentionIndex]?.teamId,
          data?.mentionsArr[mentionIndex]?.type,
          match,
          username,
          mentionsArrToSend,
        );
        mentionIndex++;
        return mentionHtml;
      });
    }
    renderTextWithBreaks(data?.content);

    var response = await fetch(`${CHAT_SERVER_URL}/chat/message`, {
      method: 'POST',
      headers: {
        Authorization: data?.accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attachment: data?.attachment,
        content: data?.content,
        mentions: mentionsArrToSend || [],
        teamId: data?.teamId,
        requestId: data?.requestId,
        orgId: data?.orgId,
        senderId: data?.senderId,
        parentId: data?.parentId,
        createdAt: '2022-05-23T07:02:37.051Z',
        appId: '62b53b61b5b4a2001fb9af37',
        senderType: 'USER',
      }),
    });
    const result = await response.json();
  } catch (error) {
    console.warn(error);
  }
};
// export const sendGlobalMessageApi = async messageObj => {
//   try {
//     const mentionRegex = /@(\w+)/g;
//     // Replace mentions with HTML tags
//     let mentionsArrToSend = [];
//     let mentionIndex = 0;
//     if (messageObj?.mentionsArr?.length > 0) {
//       message = messageObj?.content?.replace(
//         mentionRegex,
//         (match, username) => {
//           const mentionHtml = mentionHTML(
//             message?.mentionsArr[mentionIndex]?.userId,
//             message?.mentionsArr[mentionIndex]?.teamId,
//             message?.mentionsArr[mentionIndex]?.type,
//             match,
//             username,
//             mentionsArrToSend,
//           );
//           mentionIndex++;
//           return mentionHtml;
//         },
//       );
//     }
//     message = renderTextWithBreaks(message);

//     var response = await fetch(`${CHAT_SERVER_URL}/chat/message`, {
//       method: 'POST',
//       headers: {
//         Authorization: messageObj?.accessToken,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         content: messageObj.content,
//         mentions: mentionsArrToSend || [],
//         teamId: messageObj.teamId,
//         requestId: '73d31f2e-9039-401c-83cd-909953c264f1',
//         orgId: messageObj.orgId,
//         senderId: messageObj.senderId,
//         parentId: messageObj.parentId,
//         createdAt: messageObj?.date,
//         senderType: 'USER',
//         appId: '62b53b61b5b4a2001fb9af37',
//       }),
//     });
//     const result = await response.json();
//   } catch (error) {
//     console.warn(error);
//   }
// };
