import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Animated,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import SearchBox from '../../components/searchBox';
import { useTheme } from '@react-navigation/native';
import { DEVICE_TYPES } from '../../constants/Constants';
import NoChannelsFound from './components/NoChannelsFound';
import NoInternetComponent from '../../components/NoInternetComponent';
import { AddFabButton, SearchFabButton } from './components/AddAndSearchFab';
import { CreateChannelModal } from './components/CreateChannelComponent';
import { Throttling } from '../../utils/Throttling';
import { useCustomSelector } from '../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../types/reduxCoreType';
import { RecentChannelsListComponentV2 } from './components/RecentChannelsListV2';
import { setCurrentOrgIdV2 } from '../../reduxV2/orgs/orgsSlice';
import { SearchedChannelsListV2 } from './components/SearchedChannelListV2';
import { getChannelsByQueryStartV2 } from '../../reduxV2/searchedData/searchedDataSlice';

export const ChannelsScreenV2 = () => {
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
    deviceType,
    channels,
    recentChannels,
    searchedChannelsLength
  } = useCustomSelector((state: $ReduxCoreType) => ({
    currentOrgId: state?.orgs?.currentOrgId,
    currentUser: state?.allUsers?.currentUser,
    deviceType: state?.appInfo?.deviceType,
    channels: state?.channels?.channels,
    recentChannels: state?.channels?.recentChannels,
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

  const handleSearchValueChange = async () => {
    dispatch(getChannelsByQueryStartV2({
      query: searchValue,
      orgId: currentOrgId
    }))
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(
      setCurrentOrgIdV2({
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

