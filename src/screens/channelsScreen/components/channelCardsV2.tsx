import React, {
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Button,
  TouchableNativeFeedback,
  Dimensions,
  StyleSheet,
  Vibration,
  Platform,
} from 'react-native';
import {useNavigation , useTheme} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import * as RootNavigation from '../../../navigation/RootNavigation';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {DEVICE_TYPES} from '../../../constants/Constants';
import {RightSwipeAction} from './RightActionsForChatCard';
import FastImage from 'react-native-fast-image';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {makeStyles} from '../ChannelCardStyles';
import { useCustomSelector } from '../../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../../types/reduxCoreType';
const TouchableItem =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const LIST_ITEM_HEIGHT = 60;
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.4;

const ChannelCard = ({
  item,
  // markAsUnreadAction,
  // closeChannelAction,
  setChatDetailsForTab,
}) => {
  // console.log(item);
  
  const navigation = useNavigation();
  const {deviceType,currentOrgId,currentUserId,userIdAndDataMapping,teamIdAndDataMapping,accessToken} = useCustomSelector((state:$ReduxCoreType)=>({
    deviceType:state?.appInfo?.deviceType,
    currentOrgId: state?.orgs?.currentOrgId,
    currentUserId: state?.allUsers?.currentUser?.id,
    userIdAndDataMapping: state?.allUsers?.userIdAndDataMapping,
    teamIdAndDataMapping: state?.channels?.teamIdAndDataMapping,
    accessToken: state?.appInfo?.accessToken
  }))

  const handleListItemPress = (
    teamId,
    channelType,
    userId,
    searchedChannel,
  ) => {
    setChatDetailsForTab({
      teamId: teamId,
      channelType: channelType,
      userId: userId,
      searchedChannel: searchedChannel,
    });
  };

  const {colors} = useTheme();
  const styles = makeStyles(colors);
//   const userIdAndDisplayNameMapping = orgsState?.userIdAndDisplayNameMapping;
//   const userIdAndNameMapping = orgsState?.userIdAndNameMapping;
//   const teamIdAndUnreadCountMapping =
//     channelsState?.teamIdAndUnreadCountMapping;
//   const teamIdAndBadgeCountMapping = channelsState?.teamIdAndBadgeCountMapping;
//   const highlightChannel = channelsState?.highlightChannel;
//   const currentOrgId = orgsState?.currentOrgId;
  const userId =
    item?.userIds[0] !== currentUserId ? item?.userIds[0] : item?.userIds[1];
    
    const swipeableRef = useRef(null);
    
    const Name =
    item?.type === 'DIRECT_MESSAGE'
    ? userIdAndDataMapping[userId]
    ? userIdAndDataMapping[userId].displayName || userIdAndDataMapping[userId].fullName
    : 'Loading...'
    : item?.name;
    
    item?.type == 'DIRECT_MESSAGE' && console.log("=-=-=-=--=,",Name,userIdAndDataMapping[userId].avatar);
  
  const iconName =
    item?.type === 'DIRECT_MESSAGE'
      ? 'user'
      : item?.type === 'PRIVATE'
      ? 'lock'
      : 'hashtag';

//   const unread = useMemo(() => {
//     const unreadCount = teamIdAndUnreadCountMapping?.[item?._id] || 0;
//     const isHighlighted = highlightChannel?.[item?._id];
//     return unreadCount > 0 || isHighlighted;
//   }, [item?._id, teamIdAndUnreadCountMapping, highlightChannel]);

  const onPress = useCallback(() => {
    if (deviceType === DEVICE_TYPES[1]) {
      handleListItemPress(item?._id, item?.type, userId, false);
    } else {
      RootNavigation.navigate('Chat', {
        chatHeaderTitle: Name,
        teamId: item?._id,
        channelType: item?.type,
        reciverUserId: userId,
        searchedChannel: false,
      });
    }
  }, [
    Name,
    currentOrgId,
    item?._id,
    item?.type,
    // teamIdAndUnreadCountMapping,
    currentUserId,
    userId,
    // accessToken,
    // networkState,
  ]);
  // const renderRightActions = useCallback(
  //   (progress, dragX) => {
  //     const scale = dragX.interpolate({
  //       inputRange: [-10, 0],
  //       outputRange: [1, 0],
  //       extrapolate: 'clamp',
  //     });
  //     return item?.type !== 'PUBLIC' &&
  //       (teamIdAndUnreadCountMapping[item?._id] > 0 ||
  //         teamIdAndBadgeCountMapping[item?._id] > 0) ? null : (
  //       <RightSwipeAction
  //         scale={scale}
  //         swipeableRef={swipeableRef}
  //         item={item}
  //         Name={Name}
  //       />
  //     );
  //   },
  //   [item, swipeableRef, markAsUnreadAction, closeChannelAction, Name],
  // );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: Name,
    });
  }, [Name, navigation]);

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginVertical = useSharedValue(5);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD;
      if (shouldBeDismissed) {
        // translateX.value = withTiming(-SCREEN_WIDTH);
        translateX.value = withTiming(0);
        // itemHeight.value = withTiming(0);
        // marginVertical.value = withTiming(0);
        // runOnJS(
        //   markAsUnreadAction(item?.orgId, userId, item?._id, accessToken, 1, 0),
        // );
        // runOnJS(markAsUnreadAction)(
        //   item?.orgId,
        //   currentUserId,
        //   item?._id,
        //   accessToken,
        //   1,
        //   0,
        // );
        runOnJS(Vibration.vibrate)([10, 100]);
        // opacity.value = withTiming(0, undefined, isFinished => {
        //   if (isFinished) {
        //     runOnJS(
        //       markAsUnreadAction(
        //         item?.orgId,
        //         userId,
        //         item?._id,
        //         accessToken,
        //         1,
        //         0,
        //       ),
        //     );
        //   }
        // });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0,
    );
    return {opacity};
  });

  const rTaskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      // marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <TouchableItem onPress={onPress}>
      <Animated.View style={[styles.taskContainer, rTaskContainerStyle]}>
        <Animated.View
          style={[
            styles.iconContainer,
            rIconContainerStyle,
            {height: LIST_ITEM_HEIGHT, width: LIST_ITEM_HEIGHT},
          ]}>
          <FontAwesome5
            name={'eye-slash'}
            size={LIST_ITEM_HEIGHT * 0.3}
            color={'red'}
          />
          <Text style={{color: 'red', fontSize: 8}}>Mark as Unread</Text>
        </Animated.View>
        <PanGestureHandler
          failOffsetY={[-5, 5]}
          activeOffsetX={[-5, 5]}
          // simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={panGesture}>
          <Animated.View
            style={[styles.task, rStyle, {minHeight: LIST_ITEM_HEIGHT}]}>
            <View style={styles.cardStyle}>
              {item?.type === 'DIRECT_MESSAGE' ? (
                <FastImage
                  source={{
                    uri: userIdAndDataMapping[userId].avatar
                      ? userIdAndDataMapping[userId].avatar
                      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
                    priority: FastImage.priority.normal,
                  }}
                  style={styles.userIcon}
                />
              ) : (
                <View style={styles.channelIcon}>
                  <Icon name={iconName} size={14} color={'#000000'} />
                </View>
              )}
              <Text style={styles.taskTitle}>{Name}</Text>
              <View style={{marginLeft: 'auto', marginRight: 10}}>
                {/* {teamIdAndUnreadCountMapping?.[item?._id] > 0 ? (
                  <View style={styles.unreadButton}>
                    <Text style={styles.unreadButtonText}>
                      {teamIdAndUnreadCountMapping?.[item?._id]}
                    </Text>
                  </View>
                ) : (
                  teamIdAndBadgeCountMapping?.[item?._id] > 0 && (
                    <View style={styles.markUnreadButton} />
                  )
                )} */}
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </TouchableItem>
    // <GestureHandlerRootView>
    //   <Swipeable renderRightActions={renderRightActions} ref={swipeableRef}>
    //     <TouchableItem
    //       onPress={onPress}
    //       background={
    //         Platform.OS === 'android'
    //           ? TouchableNativeFeedback.Ripple('#00000033')
    //           : null
    //       }
    //       activeOpacity={0.8}>
    //       <View
    //         style={{
    //           borderTopWidth: 0.3,
    //           borderTopColor: '#B3B3B3',
    //           backgroundColor: colors.primaryColor,
    //           width: '100%',
    //           flexDirection: 'column',
    //           justifyContent: 'center',
    //         }}>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             alignItems: 'center',
    //             justifyContent: 'space-between',
    //             padding: 20,
    //           }}>
    //           <View
    //             style={{
    //               flexDirection: 'row',
    //               alignItems: 'center',
    //               maxWidth: '85%',
    //             }}>
    //             <Icon name={iconName} size={14} color={colors.textColor} />
    //             <Text>{'  '}</Text>
    //             <Text
    //               style={{
    //                 fontSize: 16,
    //                 fontWeight: unread ? '700' : '400',
    //                 color: colors.textColor,
    //               }}
    //               numberOfLines={1}
    //               ellipsizeMode="tail">{`${Name}`}</Text>
    //           </View>
    //           {teamIdAndUnreadCountMapping?.[item?._id] > 0 ? (
    //             <View
    //               style={{
    //                 backgroundColor: '#73e1ff',
    //                 paddingHorizontal: 5,
    //                 paddingVertical: 2,
    //                 borderRadius: 5,
    //                 overflow: 'hidden',
    //               }}>
    //               <Text
    //                 style={{
    //                   color: 'black',
    //                   fontSize: 14,
    //                   fontWeight: 'bold',
    //                   textAlign: 'center',
    //                   minWidth: 15,
    //                   height: 20,
    //                   lineHeight: 20,
    //                 }}>
    //                 {teamIdAndUnreadCountMapping?.[item?._id]}
    //               </Text>
    //             </View>
    //           ) : (
    //             teamIdAndBadgeCountMapping?.[item?._id] > 0 && (
    //               <View
    //                 style={{
    //                   backgroundColor: 'red',
    //                   borderRadius: 5,
    //                   minWidth: 20,
    //                   height: 20,
    //                 }}></View>
    //             )
    //           )}
    //         </View>
    //       </View>
    //     </TouchableItem>
    //   </Swipeable>
    // </GestureHandlerRootView>
  );
};

export const RenderChannelsV2 = React.memo(ChannelCard);