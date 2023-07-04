import React, {useMemo, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {makeStyles} from '../ChatCardStyles';
import {ms} from 'react-native-size-matters';
import HTMLView from 'react-native-htmlview';
import {RenderHTML} from 'react-native-render-html';
import {tagsStyles} from '../HtmlStyles';
import {formatTime} from '../../../utils/FormatTime';
import AudioRecordingPlayer from '../../../components/AudioRecorderPlayer';
import {reactionOnChatStart} from '../../../redux/actions/chat/ReactionsActions';
import {connect} from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';
import {EMOJI_ARRAY} from '../../../constants/Constants';

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

  if (!isActivity) {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View
          style={{
            minHeight: 40,
            width: '50%',
            paddingVertical: 3,
            paddingHorizontal: 10,
            backgroundColor: 'white',
            borderRadius: 25,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {EMOJI_ARRAY?.map((obj, index) => (
            <TouchableOpacity
              onPress={() => {
                const reactionExists =
                  chat?.reactions?.length > 0
                    ? chat?.reactions?.some(
                        reaction =>
                          reaction.reaction_icon === obj.reaction_icon,
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
              }}
              key={index}>
              <Text style={{fontSize: 30, color: '#ffffff', marginRight: 7}}>
                {obj.reaction_icon}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setemojiModel(!emojiModel)}>
            <Text style={{color: 'black', fontSize: 30, marginLeft: 5}}>+</Text>
          </TouchableOpacity>
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
        </View>
        <View
          style={{
            marginTop: 5,
            alignSelf: 'center',
          }}>
          <View
            style={[
              styles.textContainer,
              styles.container,
              sentByMe ? styles.sentByMe : styles.received,
              {padding: 10, backgroundColor: containerBackgroundColor},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  styles.nameText,
                  {color: textColor, marginRight: 10, fontSize: 18},
                ]}>
                {SenderName}
              </Text>
              <Text
                style={[
                  styles.timeText,
                  styles.text,
                  {
                    color: sentByMe ? '#cccccc' : dark ? '#cccccc' : 'black',
                    fontSize: 13,
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
                    <Icon name="attach-file" size={ms(14)} /> attachment
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
            {attachment?.length > 0 &&
              attachment?.map((item, index) => {
                return item?.contentType?.includes('image') ? (
                  <View
                    key={index}
                    style={{marginVertical: 5, alignItems: 'center'}}>
                    <Image
                      source={{uri: item?.resourceUrl}}
                      style={{
                        height: ms(150),
                        width: ms(150),
                      }}
                    />
                  </View>
                ) : item?.contentType?.includes('audio') ? (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      height: 50,
                      width: ms(280),
                    }}>
                    <AudioRecordingPlayer remoteUrl={item?.resourceUrl} />
                  </View>
                ) : (
                  <View
                    key={index}
                    style={[
                      styles.repliedContainer,
                      {
                        borderWidth: ms(0.5),
                        borderColor: 'gray',
                        borderRadius: ms(5),
                        padding: ms(10),
                      },
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      {item?.contentType?.includes('pdf') && (
                        <Image
                          source={require('../../../assests/images/attachments/pdfLogo.png')}
                          style={{
                            width: 40,
                            height: 40,
                            marginRight: 15,
                          }}
                        />
                      )}
                      {item?.contentType?.includes('doc') && (
                        <Image
                          source={require('../../../assests/images/attachments/docLogo.png')}
                          style={{
                            width: 40,
                            height: 40,
                            marginRight: 15,
                          }}
                        />
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

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
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
              <Text style={{color: 'white', fontSize: 20}}>.....</Text>
            )}
          </View>
        </View>
        {chat?.reactions?.length > 0 && (
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#353535',
              paddingHorizontal: 5,
              paddingVertical: 5,
              top: -5,
              borderWidth: 1,
              borderRadius: 20,
              flexDirection: 'row',
            }}>
            {chat?.reactions?.map(
              (reaction, index) =>
                index < 8 && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 3,
                      alignItems: 'center',
                    }}
                    key={index}
                    onPress={() => {
                      if (reaction?.users?.includes(userInfoState?.user?.id)) {
                        reactionAction(
                          userInfoState?.accessToken,
                          chat?.teamId,
                          chat?._id,
                          reaction.reaction_icon,
                          reaction.reaction_name,
                          reaction?.users.filter(
                            userId => userId !== userInfoState?.user?.id,
                          ),
                          'remove',
                          userInfoState?.user?.id,
                        );
                      } else {
                        reactionAction(
                          userInfoState?.accessToken,
                          chat?.teamId,
                          chat?._id,
                          reaction.reaction_icon,
                          reaction.reaction_name,
                          reaction?.users.filter(
                            userId => userId !== userInfoState?.user?.id,
                          ),
                          'add',
                          userInfoState?.user?.id,
                        );
                      }
                    }}>
                    <Text style={{color: '#ffffff', fontSize: 16}} key={index}>
                      {reaction.reaction_icon}
                    </Text>
                    {reaction.users.length > 1 && (
                      <Text
                        style={{
                          color: '#E5E4E2',
                          fontSize: 14,
                          fontWeight: '700',
                          marginRight: 2,
                          marginLeft: -3,
                        }}>
                        {' '}
                        {reaction.users.length}
                      </Text>
                    )}
                  </TouchableOpacity>
                ),
            )}
          </View>
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
