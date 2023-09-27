import React, {useMemo, useState} from 'react';
import {Animated, FlatList} from 'react-native';
import {useCallback} from 'react';
import {RenderChannels} from '../ChannelCard';
import {View} from 'react-native';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import { useCustomSelector } from '../../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../../types/reduxCoreType';
import { RenderChannelsV2 } from './channelCardsV2';

export const RecentChannelsListComponentV2 = React.memo(
  ({
    onScroll,
    refreshing,
    onRefresh,
    setChatDetailsForTab,
  }) => {
    const {channels,recentChannels}=useCustomSelector((state:$ReduxCoreType)=>({
        recentChannels:state?.channels?.recentChannels,
        channels: state?.channels?.channels
    }))
    const memoizedData = useMemo(
      () => recentChannels || channels || [],
      [recentChannels, channels],
    );

    const renderItemChannels = useCallback(
      ({item, index}) => {
        return (
          !item?.isArchived && (
            <RenderChannelsV2
              item={item}
            //   channelsState={channelsState}
              setChatDetailsForTab={setChatDetailsForTab}
            //   accessToken={userInfoState?.accessToken}
            //   currentUserId={userInfoState?.user?.id}
            />
          )
        );
      },
      [
        recentChannels,
        channels,
        // channelsState?.teamIdAndUnreadCountMapping,
        // channelsState?.teamIdAndBadgeCountMapping,
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() => {
            return <View style={{height: 100}} />;
          }}
        />
      </View>
    );
  },
);
