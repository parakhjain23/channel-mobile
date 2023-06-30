import React, {useMemo, useState} from 'react';
import {Animated, FlatList, Text} from 'react-native';
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
    // console.log('recent channelt list');

    const memoizedData = useMemo(
      () => channelsState?.recentChannels || channelsState?.channels || [],
      [channelsState?.recentChannels, channelsState?.channels],
    );

    const renderItemChannels = useCallback(
      ({item, index}) => {
        // console.log(index);
        return (
          !item?.isArchived && (
            <RenderChannels
              item={item}
              channelsState={channelsState}
              setChatDetailsForTab={setChatDetailsForTab}
              accessToken={userInfoState?.accessToken}
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
          removeClippedSubviews={true}
          maxToRenderPerBatch={20}
          initialNumToRender={20}
          // refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          // }
          ListFooterComponent={() => {
            return <View style={{height: 100}} />;
          }}
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
