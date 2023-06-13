import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Linking} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {makeStyles} from '../ChatCardStyles';
import {ms} from 'react-native-size-matters';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import ImageViewer from 'react-native-image-zoom-viewer';
import HTMLView from 'react-native-htmlview';
import {RenderHTML} from 'react-native-render-html';
import {tagsStyles} from '../HtmlStyles';
import {formatTime} from '../../../utils/FormatTime';
import AudioRecordingPlayer from '../../../components/AudioRecorderPlayer';
import {reactionOnChatStart} from '../../../redux/actions/chat/ReactionsActions';
import {connect} from 'react-redux';
import EmojiPicker from 'rn-emoji-keyboard';

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
  const [selectedImage, setSelectedImage] = useState(null);
  const {width} = useWindowDimensions();
  const [emojiModel, setemojiModel] = useState(false);
  const sameSender =
    typeof chat?.sameSender === 'string'
      ? chat.sameSender === 'true'
      : chat?.sameSender;
  const isSameDate =
    typeof chat?.isSameDate === 'string'
      ? chat.isSameDate === 'true'
      : chat?.isSameDate;
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

  const handleModalClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

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
  let emojiArr = [
    {reaction_icon: '😄', reaction_name: 'grinning face with smiling eyes'},
    {reaction_icon: '😂', reaction_name: 'face with tears of joy'},
    {reaction_icon: '👍', reaction_name: 'thumbs up'},
    {reaction_icon: '✌️', reaction_name: 'victory hand'},
    {reaction_icon: '✋', reaction_name: 'raised hand'},
    {reaction_icon: '👏', reaction_name: 'clapping hands'},
    {reaction_icon: '🤝', reaction_name: 'handshake'},
  ];

  const isLimitExceed =
    parentId == null
      ? chat?.content?.length > 400
      : chatState?.data[chat.teamId]?.parentMessages[parentId]?.content > 400;

  if (!isActivity) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{marginBottom: chat?.reactions?.length > 0 ? 15 : 0}}>
        <View
          style={{
            height: 50,
            width: '50%',
            paddingVertical: 2,
            paddingHorizontal: 5,
            backgroundColor: 'white',
            borderRadius: 24,
            // marginBottom: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {emojiArr.map((obj, index) => (
            <TouchableOpacity
              onPress={() => {
                const reactionExists = chat?.reactions.some(
                  reaction => reaction.reaction_icon === obj.reaction_icon,
                );

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
          <TouchableOpacity
            onPress={() => setemojiModel(!emojiModel)}
            style={{marginLeft: -8}}>
            <Text style={{color: 'gray', fontSize: 30, bottom: -1}}>
              {'  ...'}
            </Text>
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
          />
        </View>
        <View
          style={[
            styles.container,
            sentByMe ? styles.sentByMe : styles.received,
            {
              backgroundColor: containerBackgroundColor,
              marginTop: 5,
              marginBottom: index == 0 ? 10 : 3,
              alignSelf: 'center',
            },
          ]}>
          <View style={[styles.textContainer, {padding: 10}]}>
            {
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
            }
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
            <View style={{maxWidth: '80%'}}>
              <Modal
                visible={selectedImage !== null}
                transparent={true}
                onRequestClose={handleModalClose}>
                <ImageViewer
                  imageUrls={[
                    {
                      url: selectedImage?.resourceUrl,
                      freeHeight: true,
                      freeWidth: true,
                    },
                  ]}
                  enableSwipeDown={true}
                  onSwipeDown={handleModalClose}
                />
              </Modal>
            </View>
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
                  value={`<div>${chat?.content}</div>`}
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
            {/* </View> */}
          </View>
          {chat?.reactions?.length > 0 && (
            <TouchableOpacity
              style={{
                alignSelf: sentByMe ? 'flex-end' : 'flex-start',
                backgroundColor: '#353535',
                paddingHorizontal: 5,
                paddingVertical: 2,
                top: 35,
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                marginBottom: 25,
              }}>
              {chat?.reactions?.map((reaction, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    alignItems: 'center',
                  }}>
                  {reaction.users.length > 1 && sentByMe && (
                    <Text style={{color: '#E5E4E2', fontSize: 12}}>
                      {reaction.users.length}{' '}
                    </Text>
                  )}
                  <Text style={{color: '#ffffff', fontSize: 16}} key={index}>
                    {reaction.reaction_icon}
                  </Text>
                  {reaction.users.length > 1 && !sentByMe && (
                    <Text
                      style={{
                        color: '#E5E4E2',
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      {' '}
                      {reaction.users.length}
                    </Text>
                  )}
                </View>
              ))}
            </TouchableOpacity>
          )}
        </View>
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
