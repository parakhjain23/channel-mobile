import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  Vibration,
  View,
  useWindowDimensions,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {makeStyles} from './ChatCardStyles';
import {ms} from 'react-native-size-matters';
import HTMLView from 'react-native-htmlview';
import {RenderHTML} from 'react-native-render-html';
import * as RootNavigation from '../../navigation/RootNavigation';
import {tagsStyles} from './HtmlStyles';
import {DEVICE_TYPES} from '../../constants/Constants';
import {connect, useSelector} from 'react-redux';
import {setActiveChannelTeamId} from '../../redux/actions/channels/SetActiveChannelId';
import {formatTime} from '../../utils/FormatTime';
import FastImage from 'react-native-fast-image';
import Reactions from '../../components/Reactions';
import ImageViewerComponent from './components/attachments/ImageViewerComponent';
import JSONRenderer from './JSONRenderer';
import Attachments from './components/attachments/RenderAttachments';
import {ChatSenderName} from './components/ChatUtility';
import { useCustomSelector } from '../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../types/reduxCoreType';

const AddRemoveJoinedMsg = React.memo(({senderName, content, orgState}) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const regex = /\{\{(\w+)\}\}/g;
  const result = content.replace(regex, (match, userId) => {
    return orgState?.userIdAndNameMapping[userId] || match; // return the name if it exists, or the original match if not
  });
  return (
    <View style={[styles.actionText]}>
      <Text style={styles.text}>
        {senderName} {result}
      </Text>
    </View>
  );
});

const ChatCardV2 = ({
  chat,
//   userInfoState,
//   orgState,
//   chatState,
  setreplyOnMessage,
  setrepliedMsgDetails,
  FlashListRef,
  channelType,
  index,
  setShowActions,
  setCurrentSelectedChatCard,
  setChatDetailsForTab,
  setActiveChannelTeamIdAction,
}) => {
//   const deviceType = useSelector(state => state.appInfoReducer.deviceType);
const {deviceType,currentUserId,userIdAndDataMapping,parentMessage} = useCustomSelector((state:$ReduxCoreType)=>({
    deviceType:state?.appInfo?.deviceType,
    currentUserId:state?.allUsers?.currentUser?.id,
    userIdAndDataMapping: state?.allUsers?.userIdAndDataMapping,
    parentMessage:state?.chats?.data[chat?.teamId]?.parentMessages[chat?.parentId]
}))
  const {colors, dark} = useTheme();
  const styles = useMemo(() => makeStyles(colors), [colors]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const swipeableRef = useRef(null);
  const {width} = useWindowDimensions();
  const [showMore, setShoreMore] = useState(false);
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

  const handleImagePress = useCallback(
    index => {
      setSelectedImage(chat?.attachment?.[index]);
    },
    [chat?.attachment],
  );

  const onLongPress = () => {
    setCurrentSelectedChatCard(chat);
    setShowActions(true);
    setOptionsVisible(!optionsVisible);
  };
  var parentId = chat?.parentId;
  const sentByMe = chat?.senderId == currentUserId ? true : false;
  const containerBackgroundColor = useMemo(() => {
    if (sentByMe) {
      return colors.sentByMeCardColor;
    } else {
      return colors.receivedCardColor;
    }
  }, [colors, sentByMe]);
  const SenderName = ChatSenderName(chat?.senderId);
  const linkColor = sentByMe
    ? colors.sentByMeLinkColor
    : colors.recivedLinkColor;

  const textColor = sentByMe ? colors.sentByMeTextColor : colors?.textColor;

  const swipeFromLeftOpen = () => {
    Vibration.vibrate(30);
    setrepliedMsgDetails(chat);
    setreplyOnMessage(true);
    swipeableRef?.current?.close();
  };
  const LeftSwipeActions = () => {
    return (
      <View style={{width: '10%', justifyContent: 'center', zIndex: 0}}>
        <Icon name="reply" size={20} color={colors?.color} />
      </View>
    );
  };

  const htmlStyles = color => ({
    div: {
      color: color,
      fontSize: 16,
    },
  });

  const handleListItemPress = (
    teamId,
    channelType,
    userId,
    searchedChannel,
    Name,
  ) => {
    setChatDetailsForTab({
      teamId: teamId,
      channelType: channelType,
      userId: userId,
      searchedChannel: searchedChannel,
      channelName: Name,
    });
  };
  const onPress = (teamId, channelName) => {
    if (deviceType === DEVICE_TYPES[1]) {
      handleListItemPress(
        teamId,
        'PERSONAL',
        chat?.senderId,
        false,
        channelName,
      );
    } else {
      RootNavigation.navigate('Chat', {
        chatHeaderTitle: channelName,
        teamId: teamId,
        channelType: 'PERSONAL',
        userId: chat?.senderId,
        searchedChannel: false,
      });
    }
    setActiveChannelTeamIdAction(teamId);
  };
  function renderNode(node, index, siblings, parent, defaultRenderer) {
    if (node.attribs?.class == 'mention') {
      return node?.attribs['data-username'] ? (
        <TouchableOpacity
          key={index}
          onPress={async () => {
            node?.attribs?.['data-id'] != '@all' &&
              RootNavigation.navigate('UserProfiles', {
                displayName:
                  userIdAndDataMapping[
                    node?.attribs?.['data-id']
                  ].displayName,
                userId: node?.attribs?.['data-id'],
                setChatDetailsForTab: setChatDetailsForTab,
              });
          }}>
          <Text
            style={{
              color: parentMessage
                ?.content
                ? 'black'
                : linkColor,
              textDecorationLine: 'underline',
              fontSize: 16,
            }}>
            @{node?.attribs?.['data-value']}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          key={index}
          onPress={() =>
            onPress(node?.attribs?.['data-id'], node?.attribs?.['data-value'])
          }>
          <Text
            style={{
              color: parentMessage
                ?.content
                ? 'black'
                : linkColor,
              textDecorationLine: 'underline',
              fontSize: 16,
            }}>
            #{node?.attribs?.['data-value']}
          </Text>
        </TouchableOpacity>
      );
    }
  }
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;

  if (!isActivity) {
    return (
      <GestureHandlerRootView>
        {channelType == 'DIRECT_MESSAGE' && !sameSender && (
          <View style={[sentByMe ? styles.sentByMe : styles?.received]}>
            <Text style={{fontSize: 12, color: colors?.color}}>
              {formatTime(chat?.createdAt)}
            </Text>
          </View>
        )}
        {(channelType == 'PUBLIC' ||
          channelType == 'PRIVATE' ||
          channelType == 'DEFAULT') &&
          !sameSender &&
          SenderName == 'You' && (
            <View style={[sentByMe ? styles.sentByMe : styles?.received]}>
              <Text style={{fontSize: 12, color: colors?.color}}>
                {formatTime(chat?.createdAt)}
              </Text>
            </View>
          )}
        <View
          style={{
            flexDirection: 'row',
            marginTop: sameSender
              ? ms(0)
              : channelType == 'DIRECT_MESSAGE'
              ? ms(0)
              : SenderName == 'You'
              ? ms(0)
              : ms(10),
            marginBottom: index == 0 ? 10 : 3,
          }}>
          {SenderName != 'You' && channelType != 'DIRECT_MESSAGE' && (
            <TouchableOpacity
              onPress={async () => {
                chat?.senderId != '0' &&
                  RootNavigation.navigate('UserProfiles', {
                    displayName:
                      userIdAndDataMapping[chat?.senderId].displayName,
                    userId: chat?.senderId,
                    setChatDetailsForTab: setChatDetailsForTab,
                  });
              }}>
              <View
                style={{
                  justifyContent: 'flex-start',
                  marginRight: 5,
                  marginTop: 5,
                }}>
                {!sameSender ? (
                  <FastImage
                    source={{
                      uri: userIdAndDataMapping[chat?.senderId]?.avatar
                        ? userIdAndDataMapping[chat?.senderId]?.avatar
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
                      priority: FastImage.priority.normal,
                    }}
                    style={{
                      width: 35,
                      height: 35,
                      borderRadius: 50,
                    }}
                  />
                ) : (
                  <View style={{width: 35}}></View>
                )}
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            activeOpacity={0.6}
            onLongPress={onLongPress}
            style={{flex: 1}}>
            <Swipeable
              ref={swipeableRef}
              leftThreshold={40}
              renderLeftActions={LeftSwipeActions}
              onSwipeableWillOpen={swipeFromLeftOpen}>
              <View
                style={[
                  sentByMe ? styles.sentByMe : styles.received,
                  {
                    flexDirection: 'row',
                    flex: 1,
                    flexWrap: 'wrap',
                  },
                ]}>
                <View style={{justifyContent: 'flex-end'}}>
                  {chat?.randomId != null && (
                    <View
                      style={{
                        width: 20,
                      }}>
                      <Icon name="access-time" color={colors.color} />
                    </View>
                  )}
                </View>
                <View
                  style={[
                    styles.container,
                    {
                      backgroundColor: containerBackgroundColor,
                    },
                  ]}>
                  <View style={[styles.textContainer]}>
                    {channelType != 'DIRECT_MESSAGE' &&
                      SenderName != 'You' &&
                      !sameSender && (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[
                              styles.nameText,
                              {marginRight: 5, color: textColor},
                            ]}>
                            {SenderName}
                          </Text>
                          <Text style={[styles.timeText, styles.text]}>
                            {formatTime(chat?.createdAt)}
                          </Text>
                        </View>
                      )}
                    {parentId != null && (
                      <TouchableOpacity
                        style={[styles.repliedContainer]}
                        // onPress={() => {
                        //   !optionsVisible
                        //     ? handleRepliedMessagePress(
                        //         chatState?.data[chat.teamId]?.parentMessages[
                        //           parentId
                        //         ],
                        //         chatState,
                        //         chat,
                        //         FlashListRef,
                        //       )
                        //     : onLongPress();
                        // }}
                        // onLongPress={onLongPress}
                        >
                        {parentMessage
                          ?.attachment?.length > 0 ? (
                          <Text style={{color: 'black'}}>
                            <Icon name="attach-file" size={ms(14)} /> attachment
                          </Text>
                        ) : parentMessage.content?.includes('<span class="mention"') ? (
                          <HTMLView
                            value={`<div>${
                            parentMessage.content
                            }</div>`}
                            renderNode={renderNode}
                            stylesheet={htmlStyles('black')}
                          />
                        ) : (
                          <RenderHTML
                            source={{
                              html: parentMessage?.content?.replace(
                                emailRegex,
                                '<a href="mailTo:$&">$&</a>',
                              ),
                            }}
                            contentWidth={width}
                            tagsStyles={{body: {color: 'black'}}}
                            // renderers={renderers}
                          />
                        )}
                      </TouchableOpacity>
                    )}
                    {selectedImage != null && (
                      <ImageViewerComponent
                        url={selectedImage?.resourceUrl}
                        setSelectedImage={setSelectedImage}
                      />
                    )}
                    {attachment?.length > 0 && (
                      <Attachments
                        attachment={attachment}
                        onImagePress={index =>
                          optionsVisible
                            ? onLongPress()
                            : handleImagePress(index)
                        }
                        onAttachmentPress={optionsVisible ? onLongPress : null}
                        onLongPress={onLongPress}
                      />
                    )}

                    {!chat.messageType || chat.messageType != 'richText' ? (
                      chat?.content?.includes('<span class="mention"') ? (
                        <HTMLView
                          value={
                            !showMore
                              ? `<div>${chat?.content?.slice(0, 400)}</div>`
                              : `<div>${chat?.content}</div>`
                          }
                          renderNode={renderNode}
                          stylesheet={htmlStyles(textColor)}
                        />
                      ) : (
                        <RenderHTML
                          source={{
                            html: !showMore
                              ? chat?.content
                                  ?.slice(0, 400)
                                  .replace(
                                    emailRegex,
                                    '<a href="mailTo:$&">$&</a>',
                                  )
                              : chat?.content?.replace(
                                  emailRegex,
                                  '<a href="mailTo:$&">$&</a>',
                                ),
                          }}
                          contentWidth={width}
                          tagsStyles={tagsStyles(textColor, linkColor)}
                        />
                      )
                    ) : (
                      <JSONRenderer JSON_Example={chat.content} />
                    )}

                    {chat?.content?.length > 500 && (
                      <Text
                        style={{
                          color: linkColor,
                          textDecorationLine: 'underline',
                          marginTop: 5,
                        }}
                        onPress={() => setShoreMore(!showMore)}>
                        {showMore ? 'Show Less' : 'Show More'}
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              {chat?.reactions?.length > 0 && (
                <Reactions chat={chat} sentByMe={sentByMe} />
              )}
            </Swipeable>
          </TouchableOpacity>
        </View>
        {!isSameDate && (
          <View>
            <Text
              style={{
                color: '#808080',
                textAlign: 'center',
                marginTop: ms(15),
                marginBottom: ms(3),
              }}>
              {chat?.timeToShow}
            </Text>
          </View>
        )}
      </GestureHandlerRootView>
    );
  } else {
    return (
      <AddRemoveJoinedMsg
        senderName={SenderName}
        content={chat?.content}
        orgState={orgState}
      />
    );
  }
};

// const mapDispatchToProps = dispatch => {
//   return {
//     setActiveChannelTeamIdAction: teamId =>
//       dispatch(setActiveChannelTeamId(teamId)),
//   };
// };
export const ChatCardMemoV2 = React.memo(ChatCardV2)

const handleRepliedMessagePress = (
  repliedMessage,
  chatState,
  chat,
  FlashListRef,
) => {
  if (repliedMessage) {
    const index = chatState?.data[chat.teamId]?.messages.findIndex(
      item => item._id === repliedMessage._id,
    );
    if (index !== -1) {
      FlashListRef?.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
        viewOffset: 50,
      });
    }
  } else {
    const index = chatState?.data[chat.teamId]?.messages.findIndex(
      item => item?._id === chat?._id,
    );
    if (index !== -1) {
      FlashListRef?.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
        viewOffset: ms(50),
      });
    }
  }
};
