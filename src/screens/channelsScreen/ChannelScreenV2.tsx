import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  View,
  Animated,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { getChannelsStart } from '../../redux/actions/channels/ChannelsAction';
import SearchBox from '../../components/searchBox';
import { useIsFocused, useNavigation, useTheme } from '@react-navigation/native';
import { DEVICE_TYPES } from '../../constants/Constants';
import { createNewChannelStart } from '../../redux/actions/channels/CreateNewChannelAction';
import { getChannelsByQueryStart } from '../../redux/actions/channels/ChannelsByQueryAction';
import { createNewDmChannelStart } from '../../redux/actions/channels/CreateNewDmChannelAction';
import {
  resetActiveChannelTeamId,
  setActiveChannelTeamId,
} from '../../redux/actions/channels/SetActiveChannelId';
import NoChannelsFound from './components/NoChannelsFound';
import NoInternetComponent from '../../components/NoInternetComponent';
import { getAllUsersOfOrgStart } from '../../redux/actions/org/GetAllUsersOfOrg';
import { getChatsReset } from '../../redux/actions/chat/ChatActions';
import SearchChannelList from './components/SearchChannelList';
import RecentChannelsList from './components/RecentChannelsList';
import { AddFabButton, SearchFabButton } from './components/AddAndSearchFab';
import { CreateChannelModal } from './components/CreateChannelComponent';
import { Throttling } from '../../utils/Throttling';
import { useCustomSelector } from '../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../types/reduxCoreType';
import { RecentChannelsListComponentV2 } from './components/RecentChannelsListV2';
import { updateAppInfoState } from '../../reduxV2/appInfo/appInfoSlice';
import { setCurrentOrgIdV2 } from '../../reduxV2/orgs/orgsSlice';
import { getChannelsByQueryApi } from '../../api/channelsApi/GetChannelsByQueryApi';
import { SearchedChannelsListV2 } from './components/SearchedChannelListV2';
import { getChannelsByQueryStartV2 } from '../../reduxV2/searchedData/searchedDataSlice';

export const ChannelsScreenV2 = () => {
  console.log("CHANNEL SCREEN -0-0-0-0-0-0-0-0-0-0");

  const { colors } = useTheme();
  const dispatch = useDispatch();
  const modalizeRef = useRef(null);
  // const isFocused = useIsFocused();
  const scrollY = useRef(new Animated.Value(0));
  const { height } = Dimensions.get('window');
  const [searchValue, setsearchValue] = useState('');
  const [isScrolling, setIsScrolling] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const textInputRef = useRef(null);
  const offset = height * 0.14;
  const {
    currentOrgId,
    currentUser,
    accessToken,
    deviceType,
    channels,
    recentChannels,
    // activeChannelId,
    searchedChannelsLength
  } = useCustomSelector((state: $ReduxCoreType) => ({
    currentOrgId: state?.orgs?.currentOrgId,
    currentUser: state?.allUsers?.currentUser,
    accessToken: state?.appInfo?.accessToken,
    deviceType: state?.appInfo?.deviceType,
    channels: state?.channels?.channels,
    recentChannels: state?.channels?.recentChannels,
    // activeChannelId: state?.appInfo?.activeChannelId,
    searchedChannelsLength: state?.searchedData?.searchedChannels?.length
  }));

  const onScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY?.current } } }], {
      useNativeDriver: true,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolling(offsetY > height / 4);
      },
    }),
    [scrollY?.current, height, setIsScrolling],
  );

  // useEffect(() => {
  //   if (isFocused) {
  //     searchValue && setsearchValue('')
  //     activeChannelId && setTimeout(() => {
  //       dispatch(updateAppInfoState({ activeChannelId: '' }));
  //     }, 400);
  //   }
  // }, [isFocused]);

  const handleSearchValueChange = async () => {
    dispatch(getChannelsByQueryStartV2({
      query: searchValue,
      accessToken: accessToken,
      orgId: currentOrgId
    }))
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(
      setCurrentOrgIdV2({
        accessToken: accessToken,
        orgId: currentOrgId,
        userId: currentUser.id,
        userName: currentUser.displayName
          ? currentUser.displayName
          : currentUser.firstName,
      }),
    );
    setRefreshing(false);
  }, [currentOrgId]);

  const changeText = value => {
    setsearchValue(value);
    if (value) {
      Throttling(handleSearchValueChange, 300);
    }
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors?.primaryColor,
        borderRightWidth: deviceType === DEVICE_TYPES[1] ? 1 : 0,
        borderRightColor:
          deviceType == DEVICE_TYPES[1] ? colors?.color : colors?.primaryColor,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primaryColor,
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offset}
          style={{ flex: 1, backgroundColor: colors.primaryColor }}
        >
          <View style={{ flex: 1 }}>
            {searchValue ?
              searchedChannelsLength ? <SearchedChannelsListV2 /> : <NoChannelsFound modalizeRef={modalizeRef} setsearchValue={setsearchValue} />
              : recentChannels.length > 0 || channels?.length > 0 ?
                <RecentChannelsListComponentV2
                  onScroll={onScroll}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  setChatDetailsForTab={''}
                />
                :
                <NoInternetComponent
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
            }
            {isScrolling && (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  zIndex: 1,
                  opacity: isScrolling ? 1 : 0,
                }}>
                <SearchBox
                  textInputRef={textInputRef}
                  searchValue={searchValue}
                  changeText={changeText}
                  isSearchFocus={false}
                />
              </View>
            )}
            <AddFabButton onOpen={onOpen} />
            {!isScrolling && (
              <SearchFabButton
                setIsScrolling={setIsScrolling}
                textInputRef={textInputRef}
              />
            )}
          </View>
        </KeyboardAvoidingView>
        <CreateChannelModal modalizeRef={modalizeRef} props={''} />
      </View>
    </SafeAreaView>
  );
};

