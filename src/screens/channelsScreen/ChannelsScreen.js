import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Animated,
  KeyboardAvoidingView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import {getChannelsStart} from '../../redux/actions/channels/ChannelsAction';
import SearchBox from '../../components/searchBox';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import {DEVICE_TYPES} from '../../constants/Constants';
import {createNewChannelStart} from '../../redux/actions/channels/CreateNewChannelAction';
import {getChannelsByQueryStart} from '../../redux/actions/channels/ChannelsByQueryAction';
import {createNewDmChannelStart} from '../../redux/actions/channels/CreateNewDmChannelAction';
import {
  resetActiveChannelTeamId,
  setActiveChannelTeamId,
} from '../../redux/actions/channels/SetActiveChannelId';
import NoChannelsFound from './components/NoChannelsFound';
import NoInternetComponent from '../../components/NoInternetComponent';
import {getAllUsersOfOrgStart} from '../../redux/actions/org/GetAllUsersOfOrg';
import {getChatsReset} from '../../redux/actions/chat/ChatActions';
import AppProvider from '../appProvider/AppProvider';
import SearchChannelList from './components/SearchChannelList';
import RecentChannelsList from './components/RecentChannelsList';
import {AddFabButton, SearchFabButton} from './components/AddAndSearchFab';
import {CreateChannelModal} from './components/CreateChannelComponent';

const ChannelsScreen = props => {
  const {colors} = useTheme();
  const [searchValue, setsearchValue] = useState('');
  const navigation = useNavigation();
  const modalizeRef = useRef(null);
  const isFocused = useIsFocused();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollY = new Animated.Value(0);
  const {height} = Dimensions.get('window');
  const textInputRef = useRef(null);
  const offset = height * 0.12;

  const onScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {
      useNativeDriver: true,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolling(offsetY > height / 4);
      },
    },
  );
  useEffect(() => {
    if (isFocused) {
      searchValue?.length > 0 && textInputRef?.current?.focus();
      props?.resetActiveChannelTeamIdAction();
    }
  }, [isFocused]);
  useEffect(() => {
    if (searchValue != '') {
      props.getChannelsByQueryStartAction(
        searchValue,
        props?.userInfoState?.user?.id,
        props?.orgsState?.currentOrgId,
      );
    }
  }, [searchValue]);

  const changeText = value => {
    setsearchValue(value);
  };

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <AppProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors?.primaryColor,
          borderRightWidth: props?.deviceType === DEVICE_TYPES[1] ? 1 : 0,
          borderRightColor:
            props?.deviceType == DEVICE_TYPES[1]
              ? colors?.color
              : colors?.primaryColor,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.primaryColor,
          }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={offset}
            style={{flex: 1}}>
            {props?.channelsState?.isLoading && (
              <ActivityIndicator size={'small'} color={colors?.color} />
            )}
            <View style={{flex: 1}}>
              {searchValue != '' ? (
                props?.channelsByQueryState?.channels?.length > 0 ? (
                  <SearchChannelList props={props} navigation={navigation} />
                ) : (
                  <NoChannelsFound
                    modalizeRef={modalizeRef}
                    setsearchValue={setsearchValue}
                  />
                )
              ) : props?.channelsState?.recentChannels ||
                props?.channelsState?.channels ? (
                <RecentChannelsList onScroll={onScroll} />
              ) : (
                <NoInternetComponent
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              )}
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
          <CreateChannelModal modalizeRef={modalizeRef} props={props} />
        </View>
      </SafeAreaView>
    </AppProvider>
  );
};
const mapStateToProps = state => ({
  orgsState: state.orgsReducer,
  channelsState: state.channelsReducer,
  channelsByQueryState: state.channelsByQueryReducer,
  userInfoState: state.userInfoReducer,
  networkState: state.networkReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    getChannelsByQueryStartAction: (query, userToken, orgId) =>
      dispatch(getChannelsByQueryStart(query, userToken, orgId)),
    createNewChannelAction: (token, orgId, title, channelType, userIds) =>
      dispatch(
        createNewChannelStart(token, orgId, title, channelType, userIds),
      ),
    createDmChannelAction: (token, orgId, title, reciverUserId) =>
      dispatch(createNewDmChannelStart(token, orgId, title, reciverUserId)),
    setActiveChannelTeamIdAction: teamId =>
      dispatch(setActiveChannelTeamId(teamId)),
    resetActiveChannelTeamIdAction: () => dispatch(resetActiveChannelTeamId()),
    fetchChatResetAction: () => dispatch(getChatsReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelsScreen);
