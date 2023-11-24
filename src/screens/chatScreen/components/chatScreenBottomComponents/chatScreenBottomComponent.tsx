import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import {
  useNavigation,
  useNavigationState,
  useTheme,
} from '@react-navigation/native';
import { Button, Divider } from 'react-native-paper';
import uuid from 'react-native-uuid';
import { onStartRecord, onStopRecord } from '../../VoiceRecording';
import HTMLView from 'react-native-htmlview';
import Attachments from '../attachments/RenderAttachments';
import RenderHTML from 'react-native-render-html';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ms } from 'react-native-size-matters';
import { ACTIVITIES, DEVICE_TYPES } from '../../../../constants/Constants';
import MentionList from '../mentionList/MentionList';
import ActivityList from '../acitivityList/ActivityList';
import AudioRecordingPlayer from '../../../../components/AudioRecorderPlayer';
import { LOCAL_PATH } from '../../../../utils/Path';
import AnimatedLottieView from 'lottie-react-native';
import { useCustomSelector } from '../../../../utils/deepCheckSelector';
import { makeStyles } from '../../Styles';
import { tagsStyles } from '../../HtmlStyles';
import { listStyles } from '../attachments/AttachmentStyles';
import { useDispatch } from 'react-redux';
import { uploadRecording } from '../../VoicePicker';
import { getChannelsByQueryStartV2 } from '../../../../reduxV2/searchedData/searchedDataSlice';
import { sendMessageStartV2, setlocalMsgActionV2 } from '../../../../reduxV2/chats/chatsSlice';
import ActionModal from '../../components/actionModal/ActionModal';

export default function CSBottomComponent({
  channelType,
  teamId,
  modalizeRef,
  // replyOnMessage,
  // setreplyOnMessage
  // showActions,
  // setShowActions,
  // currentSelectChatCard,
  // setCurrentSelectedChatCard,
  // FlashListRef
}) {
  const { width } = useWindowDimensions();
  const { colors } = useTheme();
  const [showPlayer, setShowPlayer] = useState(false);
  const listStyle = listStyles(colors);
  const { channelsState, currentUserId, orgState, appState, currentOrgId, accessToken, userInfoState, chatState } = useCustomSelector((state: $ReduxCoreType) => ({
    channelsState: state?.channels,
    currentUserId: state?.allUsers?.currentUser?.id,
    orgState: state?.orgs,
    appState: state?.appInfo,
    currentOrgId: state?.orgs?.currentOrgId,
    accessToken: state?.appInfo?.accessToken,
    userInfoState: state?.allUsers,
    chatState: state?.chats
  }))
  const styles = makeStyles(colors);
  const { chatsData } = useCustomSelector((state: $ReduxCoreType) => ({
    chatsData: state?.chats?.data[teamId]
  }))
  const path = LOCAL_PATH;
  const [attachment, setAttachment] = useState([]);
  const textInputRef = useRef(null);
  const [attachmentLoading, setAttachmentLoading] = useState(false);
  const [isRecording, setisRecording] = useState(false);
  const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
  const [showOptions, setShowOptions] = useState(false);
  const [mentionsArr, setMentionsArr] = useState([]);
  const [action, setaction] = useState(null);
  const [mentions, setMentions] = useState([]);
  const [Activities, setActivities] = useState(false);
  const [showMention, setshowMention] = useState(false);
  const [recordingUrl, setrecordingUrl] = useState('');
  const [voiceAttachment, setvoiceAttachment] = useState('');
  const isMountedRef = useRef(true);
  const [replyOnMessage, setreplyOnMessage] = useState(false);
  const [repliedMsgDetails, setrepliedMsgDetails] = useState('');
  const date = useMemo(() => new Date(), []);
  const dispatch = useDispatch()
  const htmlStyles = {
    div: {
      color: 'black',
    },
  };

  //      useEffect(() => {
  //   return () => {
  //     // Set the mounted state to false when the component is unmounted
  //     isMountedRef.current = false;
  //     onStopRecord(setrecordingUrl, setvoiceAttachment, isMountedRef);
  //     setisRecording(false);
  //   };
  // }, [navigationState]);

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

  useEffect(() => {
    if (repliedMsgDetails != '' && !showPlayer) {
      textInputRef.current.focus();
    }
  }, [repliedMsgDetails]);

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
  const [message, onChangeMessage] = useState(
    chatsData?.draftMessage || '',
  );
  const handleInputChange = useCallback(
    async text => {
      onChangeMessage(text);
      const words = text.split(' ');
      const currentWord = words[words.length - 1];
      if (currentWord.startsWith('@')) {
        await dispatch(getChannelsByQueryStartV2(
          currentWord.slice(1).toString(),
          currentUserId.toString(),
          currentOrgId.toString(),
        ));
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

  const onSendWithAction = () => {
    onChangeMessage('');
    const hasMentions = mentionsArr?.length > 0;
    // if (action == ACTIVITIES[0]?.name && hasMentions) {
    //   addUsersToChannelAction(mentionsArr, teamId, currentOrgId, accessToken);
    // } else if (action == ACTIVITIES[1]?.name && hasMentions) {
    //   removeUserFromChannelAction(
    //     mentionsArr,
    //     teamId,
    //     currentOrgId,
    //     accessToken,
    //   );
    // }
    setaction('');
    setMentions([]);
    setMentionsArr([]);
  };

  const onSendPress = async () => {
    const localMessage = message;
    onChangeMessage('');
    if (localMessage?.trim() !== '' || showPlayer || attachment?.length > 0) {
      const randomId = uuid.v4();
      const data = {
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
      // setlocalMsgAction(messageContent);
      // console.log("send button pressed!")
      dispatch(setlocalMsgActionV2(data))
      if (appState?.isInternetConnected || showPlayer) {
        let response;
        if (showPlayer) {
          response = await uploadRecording(recordingUrl, accessToken);
        }
        // sendMessageAction(
        //       localMessage,
        //       teamId,
        //       currentOrgId,
        //       currentUserId,
        //       accessToken,
        //       repliedMsgDetails?._id || null,
        //       attachment?.length > 0 ? attachment : response || [],
        //       mentionsArr,
        //     );
        dispatch(sendMessageStartV2({
          message: localMessage,
          teamId: teamId,
          orgId: currentOrgId,
          senderId: currentUserId,
          token: accessToken,
          parentId: repliedMsgDetails?._id || null,
          attachment: attachment?.length > 0 ? attachment : response || [],
          mentionsArr: mentionsArr
        }));
      } else {
        // setGlobalMessageToSendAction({
        //   content: localMessage,
        //   teamId: teamId,
        //   orgId: currentOrgId,
        //   senderId: currentUserId,
        //   userId: currentUserId,
        //   accessToken: accessToken,
        //   parentId: repliedMsgDetails?.id || null,
        //   updatedAt: date,
        //   mentionsArr: mentionsArr,
        // });
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

  return (

    <SafeAreaView>
      {attachmentLoading && (
        <AnimatedLottieView
          source={require('../../../../assests/images/attachments/uploading.json')}
          loop
          autoPlay
          style={styles.attachmentLoading}
        />
      )}
      {/* {showActions && (
          <ActionModal
            setShowActions={setShowActions}
            chat={currentSelectChatCard}
            userInfoState={userInfoState}
            orgState={orgState}
            // deleteMessageAction={deleteMessageAction}
            chatState={chatState}
            setreplyOnMessage={setreplyOnMessage}
            setrepliedMsgDetails={setrepliedMsgDetails}
            FlashListRef={FlashListRef}
            channelType={channelType}
            setCurrentSelectedChatCard={setCurrentSelectedChatCard}
            currentSelectChatCard={currentSelectChatCard}
          />
        )} */}
      {(channelType == 'CHANNEL' ||
        channelType == 'PUBLIC' ||
        channelType == 'PRIVATE') &&
        !channelsState?.teamIdAndDataMapping?.[teamId]?.userIds?.includes(currentUserId) ? (
        <View>
          <Divider />
          <TouchableOpacity
            // onPress={() =>
            //   joinChannelAction(
            //     currentOrgId,
            //     teamId,
            //     currentUserId,
            //     accessToken,
            //   )
            // }
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
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  setreplyOnMessage(false);
                  setrepliedMsgDetails(null);
                }}
              >
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
            }

            {showMention && (
              <MentionList
                data={mentions}
                setMentionsArr={setMentionsArr}
                onChangeMessage={onChangeMessage}
                setMentions={setMentions}
                orgsState={orgState}
              />
            )
            }

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
                <View style={{ justifyContent: 'center' }}>
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
                      style={{ flex: 1, alignItems: 'center' }}
                      onPress={() => {
                        onStopRecord(
                          setrecordingUrl,
                          setvoiceAttachment,
                          isMountedRef,
                        ),
                          setisRecording(false),
                          setShowPlayer(true);
                      }}
                    >
                      <AnimatedLottieView
                        source={require('../../../../assests/images/attachments/recordingJson2.json')}
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
                      }}
                    >
                      STOP
                    </Button>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      //   backgroundColor: 'red',
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
                        { color: colors.textColor },
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

      )
      }

      {/* <Text>CSBottomComponent</Text> */}
    </SafeAreaView>
  )
}
