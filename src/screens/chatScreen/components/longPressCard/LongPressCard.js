import React, {useMemo, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import {RenderHTML} from 'react-native-render-html';
import {tagsStyles} from '../../HtmlStyles';
import {formatTime} from '../../../../utils/FormatTime';
import AudioRecordingPlayer from '../../../../components/AudioRecorderPlayer';
import {reactionOnChatStart} from '../../../../redux/actions/chat/ReactionsActions';
import {connect} from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import {EMOJI_ARRAY} from '../../../../constants/Constants';
import Reactions from '../../../../components/Reactions';
import {makeStyles} from './LongPressCard-Styles';
import {DocLogo, PdfLogo} from '../../../../assests/images/attachments';

const ActionMessageCard = ({
  chat,
  userInfoState,
  orgState,
  chatState,
  index,
  reactionAction,
  setShowActions,
}) => {
  const {colors, dark} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const {width} = useWindowDimensions();
  const [emojiModel, setemojiModel] = useState(false);

  const isActivity =
    typeof chat.isActivity === 'string'
      ? chat.isActivity === 'true'
      : chat.isActivity;

  const attachment = useMemo(() => {
    if (typeof chat?.attachment === 'string') {
      return JSON.parse(chat?.attachment);
    } else {
      return chat?.attachment;
    }
  }, [chat?.attachment]);

  var parentId = chat?.parentId;
  const time = formatTime(chat?.createdAt);
  const sentByMe = chat?.senderId == userInfoState?.user?.id ? true : false;
  const containerBackgroundColor = useMemo(() => {
    if (sentByMe) {
      return colors.sentByMeCardColor;
    } else {
      return colors.receivedCardColor;
    }
  }, [colors, sentByMe]);

  const SenderName = useMemo(() => {
    if (chat?.senderId === userInfoState?.user?.id) {
      return 'You';
    } else if (orgState?.userIdAndDisplayNameMapping[chat?.senderId]) {
      return orgState?.userIdAndDisplayNameMapping[chat?.senderId];
    } else {
      return orgState?.userIdAndNameMapping[chat?.senderId];
    }
  }, [chat?.senderId, orgState, userInfoState]);
  const linkColor = sentByMe
    ? colors.sentByMeLinkColor
    : colors.recivedLinkColor;

  const textColor = sentByMe ? colors.sentByMeTextColor : colors?.textColor;

  const htmlStyles = color => ({
    div: {
      color: color,
      fontSize: 16,
    },
  });

  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.attribs?.class == 'mention') {
      return (
        <Text
          key={index}
          style={{
            color: chatState?.data[chat.teamId]?.parentMessages[parentId]
              ?.content
              ? 'black'
              : linkColor,
            textDecorationLine: 'underline',
            fontSize: 16,
          }}>
          @{node?.attribs?.['data-value']}
        </Text>
      );
    }
  }
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

  const isLimitExceed =
    parentId == null
      ? chat?.content?.length > 400
      : chatState?.data[chat.teamId]?.parentMessages[parentId]?.content > 400;

  const Attachments = React.memo(() => {
    return (
      <>
        {attachment?.map((item, index) => {
          return item?.contentType?.includes('image') ? (
            <View key={index} style={styles.imageAttachContainer}>
              <Image
                source={{uri: item?.resourceUrl}}
                style={styles.imageAttachment}
              />
            </View>
          ) : item?.contentType?.includes('audio') ? (
            <View key={index} style={styles.audioAttachContainer}>
              <AudioRecordingPlayer remoteUrl={item?.resourceUrl} />
            </View>
          ) : (
            <View
              key={index}
              style={[styles.repliedContainer, styles.docContainer]}>
              <View style={styles.docContentContainer}>
                {item?.contentType?.includes('pdf') && (
                  <Image source={PdfLogo} style={styles.attachmentIcon} />
                )}
                {item?.contentType?.includes('doc') && (
                  <Image source={DocLogo} style={styles.attachmentIcon} />
                )}
                <View>
                  <Text style={{color: 'black'}}>
                    {item?.title?.slice(0, 15) + '...'}
                  </Text>
                  <Text style={{color: 'black'}}>
                    {'...' + item?.contentType?.slice(-15)}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </>
    );
  });

  const EmojiPicerComponent = () => {
    return (
      <EmojiPicker
        onEmojiSelected={e =>
          reactionAction(
            userInfoState?.accessToken,
            chat?.teamId,
            chat?._id,
            e.emoji,
            e.name,
            [],
            'add',
            userInfoState?.user?.id,
          ) && setShowActions(false)
        }
        open={emojiModel}
        onClose={() => setemojiModel(false)}
        enableSearchBar={true}
      />
    );
  };

  const onEmojiPress = obj => {
    const reactionExists =
      chat?.reactions?.length > 0
        ? chat?.reactions?.some(
            reaction => reaction.reaction_icon === obj.reaction_icon,
          )
        : false;

    const actionType = reactionExists ? 'remove' : 'add';
    reactionAction(
      userInfoState?.accessToken,
      chat?.teamId,
      chat?._id,
      obj?.reaction_icon,
      obj.reaction_name,
      [],
      actionType,
      userInfoState?.user?.id,
    ) && setShowActions(false);
  };
  if (!isActivity) {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.emojiContainer}>
          {EMOJI_ARRAY?.map((obj, index) => (
            <TouchableOpacity
              onPress={() => {
                onEmojiPress(obj);
              }}
              key={index}>
              <Text style={styles.emojiIcon}>{obj.reaction_icon}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setemojiModel(!emojiModel)}>
            <Text style={styles.emojiPlusText}>+</Text>
          </TouchableOpacity>
          <EmojiPicerComponent />
        </View>

        <View style={styles.dataContainer}>
          <View
            style={[
              styles.container,
              sentByMe ? styles.sentByMe : styles.received,
              {padding: 10, backgroundColor: containerBackgroundColor},
            ]}>
            <View style={[styles.nameTimeContainer, {color: textColor}]}>
              <Text style={[styles.nameText]}>{SenderName}</Text>
              <Text
                style={[
                  styles.timeText,
                  {
                    color: sentByMe ? '#cccccc' : dark ? '#cccccc' : 'black',
                  },
                ]}>
                {time}
              </Text>
            </View>

            {parentId != null && (
              <TouchableOpacity style={[styles.repliedContainer]}>
                {chatState?.data[chat.teamId]?.parentMessages[parentId]
                  ?.attachment?.length > 0 ? (
                  <Text style={{color: 'black'}}>
                    <Icon name="attach-file" size={14} /> attachment
                  </Text>
                ) : chatState?.data[chat.teamId]?.parentMessages[
                    parentId
                  ]?.content?.includes('<span class="mention"') ? (
                  <HTMLView
                    value={`<div>${
                      chatState?.data[chat.teamId]?.parentMessages[parentId]
                        ?.content
                    }</div>`}
                    renderNode={renderNode}
                    stylesheet={htmlStyles('black')}
                  />
                ) : (
                  <RenderHTML
                    source={{
                      html: chatState?.data[chat.teamId]?.parentMessages[
                        parentId
                      ]?.content
                        ?.slice(0, 400)
                        ?.replace(emailRegex, '<a href="mailTo:$&">$&</a>'),
                    }}
                    contentWidth={width}
                    tagsStyles={{body: {color: 'black'}}}
                  />
                )}
              </TouchableOpacity>
            )}

            {attachment?.length > 0 && <Attachments />}

            <View style={styles.textContainer}>
              {chat?.content?.includes('<span class="mention"') ? (
                <HTMLView
                  value={`<div>${chat?.content?.slice(0, 400)}</div>`}
                  renderNode={renderNode}
                  stylesheet={htmlStyles(textColor)}
                />
              ) : (
                <RenderHTML
                  source={{
                    html: chat?.content
                      ?.slice(0, 400)
                      .replace(emailRegex, '<a href="mailTo:$&">$&</a>'),
                  }}
                  contentWidth={width}
                  tagsStyles={tagsStyles(textColor, linkColor)}
                />
              )}
            </View>

            {isLimitExceed && (
              <Text style={{color: colors.color, fontSize: 20}}>.....</Text>
            )}
          </View>
        </View>
        {chat?.reactions?.length > 0 && (
          <Reactions chat={chat} setShowActions={setShowActions} />
        )}
      </TouchableOpacity>
    );
  }
};
const mapDispatchToProps = dispatch => {
  return {
    reactionAction: (
      token,
      teamId,
      messageId,
      reaction_icon,
      reaction_name,
      userIds,
      actionTye,
      userId,
    ) =>
      dispatch(
        reactionOnChatStart(
          token,
          teamId,
          messageId,
          reaction_icon,
          reaction_name,
          userIds,
          actionTye,
          userId,
        ),
      ),
  };
};
export const ActionMessageCardMemo = React.memo(
  connect(null, mapDispatchToProps)(ActionMessageCard),
);
