import React, {useMemo, useState} from 'react';
import {Animated, FlatList} from 'react-native';
import {useCallback} from 'react';
import {RenderChannels} from '../ChannelCard';
import {View} from 'react-native';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';

const RecentChannelsListComponent = React.memo(
  ({
    channelsState,
    onScroll,
    refreshing,
    onRefresh,
    setChatDetailsForTab,
    userInfoState,
  }) => {
    console.log('recent channelt list');

    const memoizedData = useMemo(
      () => channelsState?.recentChannels || channelsState?.channels || [],
      [channelsState?.recentChannels, channelsState?.channels],
    );

    const renderItemChannels = useCallback(
      ({item, index}) => {
        console.log(index);
        return (
          !item?.isArchived && (
            <RenderChannels
              item={item}
              channelsState={channelsState}
              setChatDetailsForTab={setChatDetailsForTab}
              accessToken={userInfoState?.accessToekn}
              currentUserId={userInfoState?.user?.id}
            />
          )
        );
      },
      [
        channelsState?.recentChannels,
        channelsState?.channels,
        channelsState?.teamIdAndUnreadCountMapping,
        channelsState?.teamIdAndBadgeCountMapping,
        // channelsState?.highlightChannel,
      ],
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
  channelsState: state.channelsReducer,
  userInfoState: state.userInfoReducer,
});

export default RecentChannelsList = connect(
  mapStateToProps,
  null,
)(RecentChannelsListComponent);
