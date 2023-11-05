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
import { useNavigation, useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as RootNavigation from '../../../navigation/RootNavigation';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { DEVICE_TYPES } from '../../../constants/Constants';
import { RightSwipeAction } from './RightActionsForChatCard';
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
import { makeStyles } from '../ChannelCardStyles';
import { useCustomSelector } from '../../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../../types/reduxCoreType';
const TouchableItem =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

const LIST_ITEM_HEIGHT = 60;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.4;

const SearchChannelCardV2 = ({ item }) => {
  if (item?._source?.status?.toLowerCase() === 'invited') {
    return null;
  }
  // const deviceType = appInfoState?.deviceType;
  const { deviceType, currentUser, teamIdWithUser, userData, teamIdAndDataMapping } = useCustomSelector(
    (state: $ReduxCoreType) => ({
      deviceType: state?.appInfo?.deviceType,
      currentUser: state?.allUsers?.currentUser,
      teamIdWithUser:
        state?.channels?.userIdAndTeamIdMapping[item?._source?.userId],
      userData: state?.allUsers?.userIdAndDataMapping[item?._source?.userId],
      teamIdAndDataMapping: state?.channels?.teamIdAndDataMapping
    }),
  );
  const { colors } = useTheme();
  // const handleListItemPress = (
  //   teamId,
  //   channelType,
  //   userId,
  //   searchedChannel,
  //   Name,
  // ) => {
  //   props?.setChatDetailsForTab({
  //     teamId: teamId,
  //     channelType: channelType,
  //     userId: userId,
  //     searchedChannel: searchedChannel,
  //     channelName: Name,
  //   });
  // };

  let Name =
    item?._source?.type == 'U'
      ? item?._source?.displayName
      : item?._source?.title;
  if (item?._source?.userId == currentUser.id) {
    Name = item?._source?.title + ' (You)';
  }
  const isArchived =
    item?._source?.type == 'T'
      ? item?._source?.isArchived
      : !item?._source?.isEnabled;
  const teamId = item?._id?.includes('_') ? teamIdWithUser : item?._id;
  const iconName = useMemo(
    () =>
      item?._source?.type === 'U'
        ? 'user'
        : item?._source?.status == 'PUBLIC'
          ? 'hashtag'
          : 'lock',
    [item?._source?.type, item?._source?.status],
  );

  const onPress = useCallback(async () => {
    if (teamId === undefined) {
      // this means that user ke sath team nahi he DM type ki team create krna padegi 
      // await props?.createDmChannelAction(
      //   props?.userInfoState?.accessToken,
      //   props?.orgsState?.currentOrgId,
      //   Name,
      //   item?._source?.userId,
      // ); // todo think ki create team pr redux me add api ke response se krna he ya event ke according 
    }
    if (teamIdAndDataMapping[teamId] === undefined) {
      // channel exist krta he but apne redux ke team data nahi he used for channels i am not a part of 
      // await getChannelByTeamIdAction(
      //   userInfoState.accessToken,
      //   teamId,
      //   userInfoState?.user?.id,
      // );
    }
    // if (deviceType === DEVICE_TYPES[1]) {
    //   handleListItemPress(
    //     teamId,
    //     item?._source?.type == 'U' ? 'DIRECT_MESSAGE' : 'PUBLIC',
    //     item?._source?.userId,
    //     true,
    //     Name,
    //   );
    // } else {
    RootNavigation.navigate('Chat', {
      chatHeaderTitle: Name,
      teamId: teamId,
      reciverUserId: item?._source?.userId,
      channelType: item?._source?.type == 'U' ? 'DIRECT_MESSAGE' : 'CHANNEL',
      userId: item?._source?.userId,
      searchedChannel: true,
    });
    // }
  }, [
    teamId
  ]);
  return (
    <TouchableItem
      onPress={onPress}
      activeOpacity={0.8}>
      <View
        style={{
          borderTopWidth: 0.7,
          borderTopColor: '#444444',
          minHeight: 60,
          borderRadius: 5,
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 13,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              maxWidth: item?._source?.type == 'U' ? '80%' : '95%',
            }}>
            {item._source.type != 'T' ? (
              <FastImage
                source={{
                  uri: userData?.avatar
                    ? userData?.avatar
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
                }}
                style={{
                  height: 36,
                  width: 36,
                  borderRadius: 50,
                }}
              />
            ) : (
              <Icon name={iconName} color={colors.textColor} />
            )}
            <Text>{'  '}</Text>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '400',
                color: colors.textColor,
                textDecorationLine: isArchived ? 'line-through' : null,
              }}
              numberOfLines={1}
              ellipsizeMode="tail">{`${Name}`}</Text>
          </View>
          {item?._source?.type == 'U' && (
            <View
              style={{
                position: 'absolute',
                right: 20,
              }}>
              <Button
                title="Profile"
                onPress={async () => {
                  RootNavigation.navigate('UserProfiles', {
                    displayName: userData?.displayName || userData?.fullName,
                    userId: item?._source?.userId,
                    // setChatDetailsForTab: props?.setChatDetailsForTab,
                  });
                }}
              />
            </View>
          )}
        </View>
      </View>
    </TouchableItem>
  );
};

export default React.memo(SearchChannelCardV2);
