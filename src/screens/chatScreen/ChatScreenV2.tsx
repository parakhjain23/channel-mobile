import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import uuid from 'react-native-uuid';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  SafeAreaView,
  useWindowDimensions,
  Platform,
  RefreshControl,
  Keyboard,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect, useDispatch } from 'react-redux';
import ListFooterComponent from '../../components/ListFooterComponent';
import { setActiveChannelTeamId } from '../../redux/actions/channels/SetActiveChannelId';
import {
  getChatsStart,
  sendMessageStart,
  setGlobalMessageToSend,
} from '../../redux/actions/chat/ChatActions';
import { deleteMessageStart } from '../../redux/actions/chat/DeleteChatAction';
import { ChatCardMemo } from './ChatCard';
import { getChannelsByQueryStart } from '../../redux/actions/channels/ChannelsByQueryAction';
import { makeStyles } from './Styles';
import {
  useNavigation,
  useNavigationState,
  useTheme,
} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import { ms } from 'react-native-size-matters';
import { setLocalMsgStart } from '../../redux/actions/chat/LocalMessageActions';
import { resetUnreadCountStart } from '../../redux/actions/channels/ChannelsAction';
import HTMLView from 'react-native-htmlview';
import RenderHTML from 'react-native-render-html';
import { tagsStyles } from './HtmlStyles';
import { onStartRecord, onStopRecord } from './VoiceRecording';
import { uploadRecording } from './VoicePicker';
import {
  addUserToChannelStart,
  removeUserFromChannelStart,
} from '../../redux/actions/channelActivities/inviteUserToChannelAction';
import { ACTIVITIES, DEVICE_TYPES } from '../../constants/Constants';
import ScrollDownButton from '../../components/ScrollDownButton';
import AudioRecordingPlayer from '../../components/AudioRecorderPlayer';
import FirstTabChatScreen from './FirstTabChatScreen';
import ActivityList from './components/acitivityList/ActivityList';
import MentionList from './components/mentionList/MentionList';
import ActionModal from './components/actionModal/ActionModal';
import { Button, Divider } from 'react-native-paper';
import { listStyles } from './components/attachments/AttachmentStyles';
import AttachmentOptionsModal from './components/attachments/AttachmentOptionsModal';
import { addDraftMessage } from '../../redux/actions/chat/DraftMessageAction';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Header } from '../../components/Header';
import { joinChannelStart } from '../../redux/actions/channels/JoinChannelActions';
import { AnimatedFlashList } from '@shopify/flash-list';
import { LOCAL_PATH } from '../../utils/Path';
import Attachments from './components/attachments/RenderAttachments';
import { useCustomSelector } from '../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../types/reduxCoreType';
import { ChatCardMemoV2 } from './ChatCardV2';
import { fetchMessagesStartV2 } from '../../reduxV2/chats/chatsSlice';
import { HeaderV2 } from '../../components/HeaderV2';
import CSBottomComponent from './components/chatScreenBottomComponents/chatScreenBottomComponent';

export const ChatScreenV2 = ({
  chatDetailsForTab,
  setChatDetailsForTab,
  //   deviceType,
  route,
  //   userInfoState,
  //   networkState,
  fetchChatsOfTeamAction,
  sendMessageAction,
  //   chatState,
  //   orgState,
  deleteMessageAction,
  //   channelsState,
  setActiveChannelTeamIdAction,
  setGlobalMessageToSendAction,
  getChannelsByQueryStartAction,
  //   channelsByQueryState,
  // setlocalMsgAction,
  resetUnreadCountAction,
  addUsersToChannelAction,
  removeUserFromChannelAction,
  draftMessageAction,
  joinChannelAction,
}) => {
  // var teamId:string, channelType, chatHeaderTitle, userId;

  const dispatch = useDispatch()
  const { deviceType, userIdAndDataMapping, teamIdAndDataMapping, userIdAndTeamIdMapping, isInternetConnected, currentOrgId, currentUserId, accessToken } = useCustomSelector((state: $ReduxCoreType) => ({
    deviceType: state?.appInfo?.deviceType,
    userIdAndDataMapping: state?.allUsers?.userIdAndDataMapping,
    teamIdAndDataMapping: state?.channels?.teamIdAndDataMapping,
    userIdAndTeamIdMapping: state?.channels?.userIdAndTeamIdMapping,
    isInternetConnected: state?.appInfo?.isInternetConnected,
    currentOrgId: state?.orgs?.currentOrgId,
    currentUserId: state?.allUsers?.currentUser?.id,
    accessToken: state?.appInfo?.accessToken
  }))
  // if (deviceType === DEVICE_TYPES[1]) {
  //   userId = chatDetailsForTab?.userId;
  //   teamId = chatDetailsForTab?.teamId;
  //   channelType = chatDetailsForTab?.channelType;
  //   chatHeaderTitle =
  //     channelType === 'DIRECT_MESSAGE'
  //       ? userIdAndDataMapping[userId].displayName
  //       : chatDetailsForTab?.searchedChannel
  //       ? chatDetailsForTab?.channelName
  //       :teamIdAndDataMapping[teamId].name;
  // } else {

  var { teamId, reciverUserId, channelType, searchedChannel, chatHeaderTitle } =
    route.params;
  // }

  if (teamId == undefined) {
    // when i dont have teamid with searched USER it handles that case create team ki api se data aakr state me add ho jata he waaha se yaha utha leta hu
    teamId = userIdAndTeamIdMapping[reciverUserId];
  }

  if (teamId == 'demo') {
    return <FirstTabChatScreen />;
  }

  const { chatsData } = useCustomSelector((state: $ReduxCoreType) => ({
    chatsData: state?.chats?.data[teamId]
  }))
  console.log("chatsDAta", chatsData?.messages?.length);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchMessagesStartV2({ teamId: teamId, accessToken: accessToken, skip: 0 }
        // chatState?.data?.[teamId]?.messages[0]?.['_id'],
      ))
      // setActiveChannelTeamIdAction(teamId);
    };
    if (
      !chatsData?.messages ||
      chatsData?.messages?.length === 0
    ) {
      fetchData();
    } else if (chatsData?.messages?.length > 0) {
      const timeoutId = setTimeout(fetchData, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isInternetConnected, teamId, chatDetailsForTab]);

  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const listStyle = listStyles(colors);
  const [replyOnMessage, setreplyOnMessage] = useState(false);
  const [repliedMsgDetails, setrepliedMsgDetails] = useState('');
  const [showActions, setShowActions] = useState(false);
  const [currentSelectChatCard, setCurrentSelectedChatCard] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [message, onChangeMessage] = useState(
    chatsData?.draftMessage || '',
  );
  const [attachment, setAttachment] = useState([]);
  const [attachmentLoading, setAttachmentLoading] = useState(false);
  const [showMention, setshowMention] = useState(false);
  const [mentionsArr, setMentionsArr] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mentions, setMentions] = useState([]);
  const FlashListRef = useRef(null);
  const textInputRef = useRef(null);
  const scrollY = new Animated.Value(0);
  const { height } = Dimensions.get('window');
  const offset = height * 0.12;
  const screenHeight = Dimensions.get('window').height;
  const { width } = useWindowDimensions();
  const date = useMemo(() => new Date(), []);
  const [recordingUrl, setrecordingUrl] = useState('');
  const [isRecording, setisRecording] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [voiceAttachment, setvoiceAttachment] = useState('');
  const [Activities, setActivities] = useState(false);
  const [action, setaction] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigationState = useNavigationState(state => state);
  const isMountedRef = useRef(true);
  const modalizeRef = useRef(null);
  const navigation = useNavigation();
  // const teamIdAndUnreadCountMapping =
  //   channelsState?.teamIdAndUnreadCountMapping;
  // const teamIdAndBadgeCountMapping = channelsState?.teamIdAndBadgeCountMapping;
  //   const currentUserId = userInfoState?.user?.id;
  //   const accessToken = userInfoState?.accessToken;
  //   const currentOrgId = orgState?.currentOrgId;
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
  // const shouldResetUnreadCount =
  //   teamIdAndUnreadCountMapping?.[teamId] > 0 ||
  //   teamIdAndBadgeCountMapping?.[teamId] > 0;
  const skip = chatsData?.messages?.length ?? 0;
  const path = LOCAL_PATH;
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', e => {
  //     e.preventDefault();
  //     if (message.length > 0) {
  //       draftMessageAction(
  //         message,
  //         teamId,
  //         accessToken,
  //         currentOrgId,
  //         currentUserId,
  //       );
  //     }
  //     navigation.dispatch(e.data.action); // Allow the screen to be removed
  //   });

  //   return () => unsubscribe();
  // }, [navigation, message]);
  // useEffect(() => {
  //   return () => {
  //     // Set the mounted state to false when the component is unmounted
  //     isMountedRef.current = false;
  //     onStopRecord(setrecordingUrl, setvoiceAttachment, isMountedRef);
  //     setisRecording(false);
  //   };
  // }, [navigationState]);

  // useEffect(() => {
  //   if (repliedMsgDetails != '' && !showPlayer) {
  //     textInputRef.current.focus();
  //   }
  // }, [repliedMsgDetails]);

  // useEffect(() => {
  //   searchedChannel && textInputRef?.current?.focus();
  //   const timeoutId = setTimeout(() => {
  //     if (shouldResetUnreadCount) {
  //       resetUnreadCountAction(
  //         currentOrgId,
  //         currentUserId,
  //         teamId,
  //         accessToken,
  //         0,
  //         0,
  //       );
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timeoutId);
  // }, [teamId]);

  // useEffect(() => {
  //   if (channelsByQueryState?.mentionChannels) {
  //     setMentions(channelsByQueryState?.mentionChannels);
  //   } else {
  //     setMentions([]);
  //   }
  // }, [channelsByQueryState?.mentionChannels]);

  const handleInputChange = useCallback(
    async text => {
      onChangeMessage(text);
      const words = text.split(' ');
      const currentWord = words[words.length - 1];
      if (currentWord.startsWith('@')) {
        await getChannelsByQueryStartAction(
          currentWord.slice(1),
          currentUserId,
          currentOrgId,
        );
        // setMentions(channelsByQueryState?.mentionChannels);
        setshowMention(true);
      } else if (
        words[0].startsWith('/') &&
        words.length === 1 &&
        !['DIRECT_MESSAGE', 'PERSONAL'].includes(channelType)
      ) {
        setActivities(true);
        setMentions([]);
        setshowMention(false);
      } else {
        setMentions([]);
        setActivities(false);
        setshowMention(false);
      }
    },
    [
      onChangeMessage,
      // channelsByQueryState?.mentionChannels,
      currentUserId,
      currentOrgId,
    ],
  );

  const scrollToBottom = () => {
    FlashListRef?.current?.scrollToOffset({ animating: true, offset: 0 });
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: true,
      listener: ({ nativeEvent }) => {
        const offsetY = nativeEvent.contentOffset.y;
        setIsScrolling(offsetY >= 0.7 * screenHeight);
      },
    },
  );

  const memoizedData = useMemo(
    () => chatsData?.messages || [],
    [chatsData?.messages],
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      // console.log(index);
      return (
        <ChatCardMemoV2
          chat={item}
          // userInfoState={userInfoState}
          // orgState={orgState}
          // networkState={networkState}
          deleteMessageAction={deleteMessageAction}
          // chatState={chatState}
          setreplyOnMessage={setreplyOnMessage}
          setrepliedMsgDetails={setrepliedMsgDetails}
          FlashListRef={FlashListRef}
          channelType={channelType}
          index={index}
          setShowActions={setShowActions}
          setCurrentSelectedChatCard={setCurrentSelectedChatCard}
          setChatDetailsForTab={setChatDetailsForTab}
        />
      );
    },
    [chatsData?.messages],
  );

  const onEndReached = useCallback(() => {
    // fetchChatsOfTeamAction(teamId, accessToken, skip);
    dispatch(fetchMessagesStartV2({
      teamId: teamId,
      accessToken: accessToken,
      skip: skip
    }))
  }, [teamId, accessToken, skip]);

  function renderNode(node, index, siblings, parent, defaultRenderer) {
    const attribs = node?.attribs;
    if (attribs?.class === 'mention') {
      const dataValue = attribs['data-value'];
      return (
        <Text
          key={index}
          style={{ color: 'black', textDecorationLine: 'underline' }}>
          @{dataValue}
        </Text>
      );
    }
  }

  const handleRefresh = () => {
    setRefreshing(true);
    fetchChatsOfTeamAction(teamId, accessToken);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const htmlStyles = {
    div: {
      color: 'black',
    },
  };

  const onSendWithAction = () => {
    onChangeMessage('');
    const hasMentions = mentionsArr?.length > 0;
    if (action == ACTIVITIES[0]?.name && hasMentions) {
      addUsersToChannelAction(mentionsArr, teamId, currentOrgId, accessToken);
    } else if (action == ACTIVITIES[1]?.name && hasMentions) {
      removeUserFromChannelAction(
        mentionsArr,
        teamId,
        currentOrgId,
        accessToken,
      );
    }
    setaction('');
    setMentions([]);
    setMentionsArr([]);
  };

  const onSendPress = async () => {
    const localMessage = message;
    onChangeMessage('');
    if (localMessage?.trim() !== '' || showPlayer || attachment?.length > 0) {
      const randomId = uuid.v4();
      const messageContent = {
        randomId: randomId,
        content: localMessage,
        createdAt: date,
        isLink: false,
        mentions: mentionsArr,
        orgId: currentOrgId,
        parentId: repliedMsgDetails?._id,
        senderId: currentUserId,
        senderType: 'APP',
        teamId: teamId,
        updatedAt: date,
        attachment: showPlayer ? voiceAttachment : attachment,
        mentionsArr: mentionsArr,
        parentMessage: repliedMsgDetails?.content,
      };
      setlocalMsgAction(messageContent);

      if (networkState?.isInternetConnected || showPlayer) {
        let response;
        if (showPlayer) {
          response = await uploadRecording(recordingUrl, accessToken);
        }
        sendMessageAction(
          localMessage,
          teamId,
          currentOrgId,
          currentUserId,
          accessToken,
          repliedMsgDetails?._id || null,
          attachment?.length > 0 ? attachment : response || [],
          mentionsArr,
        );
      } else {
        setGlobalMessageToSendAction({
          content: localMessage,
          teamId: teamId,
          orgId: currentOrgId,
          senderId: currentUserId,
          userId: currentUserId,
          accessToken: accessToken,
          parentId: repliedMsgDetails?.id || null,
          updatedAt: date,
          mentionsArr: mentionsArr,
        });
      }
    }

    attachment?.length > 0 && setAttachment([]),
      showOptions && setShowOptions(false),
      mentionsArr?.length > 0 && setMentionsArr(''),
      mentions?.length > 0 && setMentions([]),
      replyOnMessage && setreplyOnMessage(false),
      repliedMsgDetails && setrepliedMsgDetails(null),
      showPlayer && setShowPlayer(false);
  };

  const AttachmentObject = {
    modalizeRef,
    accessToken,
    setAttachment,
    setAttachmentLoading,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeAreaView}>
        {!isScrolling && (
          <HeaderV2
            chatHeaderTitle={chatHeaderTitle}
            userId={reciverUserId || userId}
            channelType={channelType}
            teamId={teamId}
          // setChatDetailsForTab={setChatDetailsForTab}
          />
        )}
        <View style={styles.mainContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={searchedChannel ? 75 : offset}
            style={{ flex: 1 }}>
            <View style={styles.outerContainer}>
              <View style={styles.messageListContainer}>
                {teamId == undefined ||
                  chatsData?.isloading == true ? (
                  <View style={styles.loadingContainer}>
                    <Text style={{ color: colors?.color, textAlign: 'center' }}>
                      Loading...
                    </Text>
                  </View>
                ) : (
                  <>
                    <AnimatedFlashList
                      ref={FlashListRef}
                      data={memoizedData}
                      renderItem={renderItem}
                      estimatedItemSize={200}
                      inverted
                      ListFooterComponent={
                        chatsData?.messages?.length > 15 &&
                        ListFooterComponent
                      }
                      onEndReached={
                        chatsData?.messages?.length > 20
                          ? onEndReached
                          : null
                      }
                      onEndReachedThreshold={0.9}
                      keyboardDismissMode="on-drag"
                      keyboardShouldPersistTaps="always"
                      onScroll={onScroll}
                      showsVerticalScrollIndicator={false}
                      removeClippedSubviews={true}
                      // maxToRenderPerBatch={20}
                      // initialNumToRender={20}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={handleRefresh}
                        />
                      }
                    />
                  </>
                )}
                <ScrollDownButton
                  scrollToBottom={scrollToBottom}
                  isVisible={isScrolling}
                  isNewMessage={false}
                />
              </View>
              {/* 
              {attachmentLoading && (
                <AnimatedLottieView
                  source={require('../../assests/images/attachments/uploading.json')}
                  loop
                  autoPlay
                  style={styles.attachmentLoading}
                />
              )} */}

              {/* {showActions && (
                <ActionModal
                  setShowActions={setShowActions}
                  chat={currentSelectChatCard}
                  userInfoState={userInfoState}
                  orgState={orgState}
                  deleteMessageAction={deleteMessageAction}
                  chatState={chatState}
                  setreplyOnMessage={setreplyOnMessage}
                  setrepliedMsgDetails={setrepliedMsgDetails}
                  FlashListRef={FlashListRef}
                  channelType={channelType}
                  setCurrentSelectedChatCard={setCurrentSelectedChatCard}
                  currentSelectChatCard={currentSelectChatCard}
                />
              )} */}

              {/* {(channelType == 'CHANNEL' ||
                channelType == 'PUBLIC' ||
                channelType == 'PRIVATE') &&
              !channelsState?.channelIdAndDataMapping[
                teamId
              ]?.userIds?.includes(currentUserId) ? (
                <View>
                  <Divider />
                  <TouchableOpacity
                    onPress={() =>
                      joinChannelAction(
                        currentOrgId,
                        teamId,
                        currentUserId,
                        accessToken,
                      )
                    }
                    style={{
                      borderWidth: 1,
                      borderColor: '#50C878',
                      borderRadius: 5,
                      alignSelf: 'center',
                      marginVertical: 15,
                      paddingHorizontal: 20,
                    }}>
                    <Text
                      style={{
                        margin: 10,
                        fontSize: 16,
                        color: colors.textColor,
                      }}>
                      Join this channel
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.bottomContainer}>
                  <View
                    style={[
                      replyOnMessage && styles.inputWithReplyContainer,
                      {
                        width: '100%',
                        alignSelf: 'center',
                      },
                    ]}>
                    {attachment?.length > 0 &&
                      attachment?.map((item, index) => {
                        return (
                          <TouchableOpacity key={index}>
                            <View style={styles.replyMessageInInput}>
                              <Text style={styles.repliedText}>
                                {item?.title}
                              </Text>
                              <MaterialIcons
                                name="cancel"
                                size={ms(18)}
                                color={'black'}
                                onPress={() => {
                                  const newAttachment = attachment.filter(
                                    (_, i) => i !== index,
                                  );
                                  setAttachment(newAttachment);
                                }}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      })}

                    {replyOnMessage &&
                      (console.log(repliedMsgDetails, '=-=-'),
                      (
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => {
                            setreplyOnMessage(false);
                            setrepliedMsgDetails(null);
                          }}>
                          <View style={styles.replyMessageInInput}>
                            {repliedMsgDetails?.content?.includes(
                              '<span class="mention"',
                            ) ? (
                              <HTMLView
                                value={`<div>${repliedMsgDetails?.content}</div>`}
                                renderNode={renderNode}
                                stylesheet={htmlStyles}
                              />
                            ) : repliedMsgDetails?.attachment?.length > 0 &&
                              typeof repliedMsgDetails?.attachment !=
                                'string' ? (
                              <Attachments
                                attachment={repliedMsgDetails?.attachment}
                              />
                            ) : (
                              <RenderHTML
                                source={{
                                  html: repliedMsgDetails?.content?.replace(
                                    emailRegex,
                                    '<span>$&</span>',
                                  ),
                                }}
                                contentWidth={width}
                                tagsStyles={tagsStyles('black', 'black')}
                              />
                            )}
                            <MaterialIcons
                              name="cancel"
                              size={ms(16)}
                              color="black"
                              style={{
                                position: 'absolute',
                                top: ms(5),
                                right: ms(5),
                                zIndex: 1,
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      ))}

                    {showMention && (
                      <MentionList
                        data={mentions}
                        setMentionsArr={setMentionsArr}
                        onChangeMessage={onChangeMessage}
                        setMentions={setMentions}
                        orgsState={orgState}
                      />
                    )}

                    {Activities && (
                      <ActivityList
                        setaction={setaction}
                        onChangeMessage={onChangeMessage}
                        setActivities={setActivities}
                      />
                    )}

                    {showPlayer && (
                      <View style={styles.playerContainer}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            minHeight: 60,
                            flex: 1,
                            alignItems: 'center',
                          }}>
                          <AudioRecordingPlayer remoteUrl={path} />
                        </View>
                        <MaterialIcons
                          name="cancel"
                          size={18}
                          color={colors?.textColor}
                          onPress={() => {
                            setShowPlayer(false);
                          }}
                        />
                        <View style={{justifyContent: 'center'}}>
                          <TouchableOpacity
                            onPress={!action ? onSendPress : onSendWithAction}
                            style={{
                              backgroundColor: colors?.sentByMeCardColor,
                              borderRadius: 30,
                              marginLeft: 3,
                            }}
                            activeOpacity={0.9}>
                            <MaterialIcons
                              name="send"
                              size={24}
                              style={{
                                color: colors.sentByMeTextColor,
                                padding: 10,
                              }}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                    {!showPlayer && (
                      <View style={styles.inputContainer}>
                        {isRecording ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              margin: 4,
                            }}>
                            <TouchableOpacity
                              style={{flex: 1, alignItems: 'center'}}
                              onPress={() => {
                                onStopRecord(
                                  setrecordingUrl,
                                  setvoiceAttachment,
                                  isMountedRef,
                                ),
                                  setisRecording(false),
                                  setShowPlayer(true);
                              }}>
                              <AnimatedLottieView
                                source={require('../../assests/images/attachments/recordingJson2.json')}
                                loop
                                autoPlay
                                style={{
                                  width: 45,
                                  height: 45,
                                  // backgroundColor: 'blue',
                                }}
                              />
                            </TouchableOpacity>
                            <Button
                              mode="contained"
                              icon="microphone-off"
                              buttonColor={colors?.sentByMeCardColor}
                              onPress={() => {
                                onStopRecord(
                                  setrecordingUrl,
                                  setvoiceAttachment,
                                  isMountedRef,
                                ),
                                  setisRecording(false),
                                  setShowPlayer(true);
                              }}>
                              STOP
                            </Button>
                          </View>
                        ) : (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              // backgroundColor: 'red',
                            }}>
                            <View
                              style={{
                                alignSelf: 'flex-end',
                                // backgroundColor: 'red',
                                marginBottom: 3,
                              }}>
                              <TouchableOpacity
                                style={{
                                  borderRadius: 30,
                                  // backgroundColor: 'grey',
                                  margin: 3,
                                }}
                                activeOpacity={0.9}>
                                <MaterialIcons
                                  name="add"
                                  size={24}
                                  style={[listStyle.attachIcon]}
                                  onPress={() => {
                                    Keyboard.dismiss();
                                    modalizeRef?.current?.open();
                                  }}
                                />
                              </TouchableOpacity>
                            </View>
                            <TextInput
                              ref={textInputRef}
                              editable
                              multiline
                              onChangeText={handleInputChange}
                              placeholder="Message"
                              placeholderTextColor={colors.textColor}
                              value={message}
                              style={[
                                replyOnMessage
                                  ? styles.inputWithReply
                                  : styles.inputWithoutReply,
                                {color: colors.textColor},
                              ]}
                            />
                            <View
                              style={{
                                alignSelf: 'flex-end',
                                // margin: 1,
                                marginBottom: 3,
                              }}>
                              {message?.length > 0 ||
                              showPlayer ||
                              attachment?.length > 0 ? (
                                <TouchableOpacity
                                  onPress={
                                    !action ? onSendPress : onSendWithAction
                                  }
                                  style={{
                                    backgroundColor: colors?.sentByMeCardColor,
                                    borderRadius: 30,
                                    margin: 3,
                                  }}
                                  activeOpacity={0.9}>
                                  <MaterialIcons
                                    name="send"
                                    size={20}
                                    style={{
                                      color: colors.sentByMeTextColor,
                                      padding: 12,
                                    }}
                                  />
                                </TouchableOpacity>
                              ) : (
                                !isRecording && (
                                  <TouchableOpacity
                                    onPress={() => {
                                      onStartRecord(setisRecording);
                                    }}
                                    style={{
                                      borderRadius: 30,
                                      margin: 3,
                                      backgroundColor:
                                        colors?.sentByMeCardColor,
                                    }}
                                    activeOpacity={0.9}>
                                    <MaterialIcons
                                      name="mic"
                                      size={20}
                                      style={{
                                        color: colors.sentByMeTextColor,
                                        padding: 12,
                                      }}
                                    />
                                  </TouchableOpacity>
                                )
                              )}
                            </View>
                          </View>
                        )}
                        {showOptions &&
                          message?.length == 1 &&
                          setShowOptions(false)}
                      </View>
                    )}
                  </View>
                </View>
              )} */}
              <CSBottomComponent
                channelType={channelType}
                teamId={teamId}
                modalizeRef={modalizeRef}
              // replyOnMessage={replyOnMessage}
              // setreplyOnMessage={setreplyOnMessage}
              // showActions={showActions} 
              // setShowActions={setShowActions}
              // currentSelectChatCard={currentSelectChatCard} 
              // setCurrentSelectedChatCard={setCurrentSelectedChatCard}
              // FlashListRef={FlashListRef}
              // repliedMsgDetails={repliedMsgDetails}
              // setrepliedMsgDetails={setrepliedMsgDetails}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
      <AttachmentOptionsModal AttachmentObject={AttachmentObject} />
    </GestureHandlerRootView>
  );
};
// const mapStateToProps = state => ({
//   networkState: state.networkReducer,
//   userInfoState: state.userInfoReducer,
//   orgState: state.orgsReducer,
//   chatState: state.chatReducer,
//   channelsState: state.channelsReducer,
//   channelsByQueryState: state.channelsByQueryReducer,
// });
// const mapDispatchToProps = dispatch => {
//   return {
//     joinChannelAction: (orgId, teamId, userId, accessToken) =>
//       dispatch(joinChannelStart(orgId, teamId, userId, accessToken)),
//     draftMessageAction: (message, teamId, accessToken, orgId, userId) =>
//       dispatch(addDraftMessage(message, teamId, accessToken, orgId, userId)),
//     fetchChatsOfTeamAction: (teamId, token, skip, lastMessageId) =>
//       dispatch(getChatsStart(teamId, token, skip, lastMessageId)),
//     sendMessageAction: (
//       message,
//       teamId,
//       orgId,
//       senderId,
//       token,
//       parentId,
//       attachment,
//       mentionsArr,
//     ) =>
//       dispatch(
//         sendMessageStart(
//           message,
//           teamId,
//           orgId,
//           senderId,
//           token,
//           parentId,
//           attachment,
//           mentionsArr,
//         ),
//       ),
//     removeUserFromChannelAction: (userIds, teamId, orgId, accessToken) =>
//       dispatch(removeUserFromChannelStart(userIds, teamId, orgId, accessToken)),
//     addUsersToChannelAction: (userIds, teamId, orgId, accessToken) =>
//       dispatch(addUserToChannelStart(userIds, teamId, orgId, accessToken)),
//     setlocalMsgAction: data => dispatch(setLocalMsgStart(data)),
//     deleteMessageAction: (accessToken, msgId) =>
//       dispatch(deleteMessageStart(accessToken, msgId)),
//     setActiveChannelTeamIdAction: teamId =>
//       dispatch(setActiveChannelTeamId(teamId)),
//     setGlobalMessageToSendAction: messageObj =>
//       dispatch(setGlobalMessageToSend(messageObj)),
//     getChannelsByQueryStartAction: (query, userToken, orgId) =>
//       dispatch(getChannelsByQueryStart(query, userToken, orgId)),
//     resetUnreadCountAction: (
//       orgId,
//       userId,
//       teamId,
//       accessToken,
//       badgeCount,
//       unreadCount,
//     ) =>
//       dispatch(
//         resetUnreadCountStart(
//           orgId,
//           userId,
//           teamId,
//           accessToken,
//           badgeCount,
//           unreadCount,
//         ),
//       ),
//   };
// };
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(React.memo(ChatScreen));




