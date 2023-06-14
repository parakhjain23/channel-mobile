import React, {useMemo, useState} from 'react';
import {Animated, FlatList} from 'react-native';
import {useCallback} from 'react';
import {RenderChannels, RenderSearchChannels} from '../ChannelCard';
import {View} from 'react-native';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {getChannelsStart} from '../../../redux/actions/channels/ChannelsAction';
import {getAllUsersOfOrgStart} from '../../../redux/actions/org/GetAllUsersOfOrg';

const RecentChannelsListComponent = React.memo(
  ({
    channelsState,
    onScroll,
    orgsState,
    userInfoState,
    getChannelsAction,
    getAllUsersOfOrgAction,
  }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await getChannelsAction(
        userInfoState?.accessToken,
        orgsState?.currentOrgId,
        userInfoState?.user?.id,
        userInfoState?.user?.displayName
          ? userInfoState?.user?.displayName
          : userInfoState?.user?.firstName,
      );
      await getAllUsersOfOrgAction(
        userInfoState?.accessToken,
        orgsState?.currentOrgId,
      );
      setRefreshing(false);
    }, [orgsState?.currentOrgId]);

    const memoizedData = useMemo(
      () => channelsState?.recentChannels || channelsState?.channels || [],
      [channelsState?.recentChannels, channelsState?.channels],
    );

    const renderItemChannels = useCallback(
      ({item, index}) => {
        return !item?.isArchived && <RenderChannels item={item} />;
      },
      [channelsState?.recentChannels],
    );
    return (
      <View style={{flex: 1}}>
        <Animated.FlatList
          data={memoizedData}
          renderItem={renderItemChannels}
          onScroll={onScroll}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  },
);
const mapStateToProps = state => ({
  userInfoState: state.userInfoReducer,
  channelsState: state.channelsReducer,
  orgsState: state.orgsReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    getChannelsAction: (token, orgId, userId, userName) =>
      dispatch(getChannelsStart(token, orgId, userId, userName)),
    getAllUsersOfOrgAction: (accessToken, orgId) =>
      dispatch(getAllUsersOfOrgStart(accessToken, orgId)),
  };
};
export default RecentChannelsList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentChannelsListComponent);
