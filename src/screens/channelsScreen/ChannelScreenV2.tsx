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
import { connect } from 'react-redux';
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

export const ChannelsScreenV2 = () => {
    // console.log('channel-screen');
    const { colors } = useTheme();
    const [searchValue, setsearchValue] = useState('');
    const navigation = useNavigation();
    const modalizeRef = useRef(null);
    const isFocused = useIsFocused();
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollY = useRef(new Animated.Value(0));
    const { height } = Dimensions.get('window');
    const textInputRef = useRef(null);
    const [refreshing, setRefreshing] = useState(false);
    // const currentUser = props?.userInfoState?.user;
    const offset = height * 0.12;
    const { currentOrgId, currentUser, accessToken, deviceType } = useCustomSelector((state: $ReduxCoreType) => ({
        currentOrgId: state?.orgs?.currentOrgId,
        currentUser: state?.allUsers?.currentUser,
        accessToken: state?.appInfo?.accessToken,
        deviceType: state?.appInfo?.deviceType,
    }))
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
    //     if (isFocused) {
    //         searchValue?.length > 0 && textInputRef?.current?.focus();
    //         setTimeout(() => {
    //             props?.resetActiveChannelTeamIdAction();
    //         }, 400);
    //     }
    // }, [isFocused]); 
    // todo handle later 

    // const fetchData = () => {
    //     if (searchValue != '') {
    //         props.getChannelsByQueryStartAction(
    //             searchValue,
    //             currentUser?.id,
    //             currentOrgId,
    //         );
    //     }
    // };
    // useEffect(() => {
    //     Throttling(fetchData, 300);
    // }, [searchValue]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        // await props?.getChannelsAction(
        //     accessToken,
        //     currentOrgId,
        //     currentUser?.id,
        //     currentUser?.displayName
        //         ? currentUser?.displayName
        //         : currentUser?.firstName,
        // );
        // await props?.getAllUsersOfOrgAction(
        //     accessToken,
        //     currentOrgId,
        // );
        setRefreshing(false);
    }, [currentOrgId]);

    const changeText = value => {
        setsearchValue(value);
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
                    deviceType == DEVICE_TYPES[1]
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
                    style={{ flex: 1 }}>
                    {props?.channelsState?.isLoading && (
                        <ActivityIndicator size={'small'} color={colors?.color} />
                    )}
                    <View style={{ flex: 1 }}>
                        {searchValue != '' ? (
                            props?.channelsByQueryState?.channels?.length > 0 ? (
                                <SearchChannelList props={props} navigation={navigation} />
                            ) : (
                                <NoChannelsFound
                                    modalizeRef={modalizeRef}
                                    setsearchValue={setsearchValue}
                                />
                            )
                        ) : props?.channelsState?.recentChannels?.length > 0 ||
                            props?.channelsState?.channels?.length > 0 ? (
                            <RecentChannelsList
                                onScroll={onScroll}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                setChatDetailsForTab={props?.setChatDetailsForTab}
                            />
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
    );
};
// const mapStateToProps = state => ({
//     orgsState: state.orgsReducer,
//     channelsState: state.channelsReducer,
//     channelsByQueryState: state.channelsByQueryReducer,
//     userInfoState: state.userInfoReducer,
//     networkState: state.networkReducer,
// });
// const mapDispatchToProps = dispatch => {
//     return {
//         getChannelsByQueryStartAction: (query, userToken, orgId) =>
//             dispatch(getChannelsByQueryStart(query, userToken, orgId)),
//         createNewChannelAction: (token, orgId, title, channelType, userIds) =>
//             dispatch(
//                 createNewChannelStart(token, orgId, title, channelType, userIds),
//             ),
//         createDmChannelAction: (token, orgId, title, reciverUserId) =>
//             dispatch(createNewDmChannelStart(token, orgId, title, reciverUserId)),
//         setActiveChannelTeamIdAction: teamId =>
//             dispatch(setActiveChannelTeamId(teamId)),
//         resetActiveChannelTeamIdAction: () => dispatch(resetActiveChannelTeamId()),
//         fetchChatResetAction: () => dispatch(getChatsReset()),
//         getChannelsAction: (token, orgId, userId, userName) =>
//             dispatch(getChannelsStart(token, orgId, userId, userName)),
//         getAllUsersOfOrgAction: (accessToken, orgId) =>
//             dispatch(getAllUsersOfOrgStart(accessToken, orgId)),
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(ChannelsScreen);
