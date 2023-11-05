import React from 'react';
import { FlatList } from 'react-native';
import { useCallback } from 'react';
import { RenderSearchChannels } from '../ChannelCard';
import { View } from 'react-native';
import SearchedChannelCardV2 from './searchedChannelCardV2';
import { useCustomSelector } from '../../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../../types/reduxCoreType';

const SearchChannelListComponentV2 = () => {
  const { searchedChannels } = useCustomSelector((state: $ReduxCoreType) => ({
    searchedChannels: state?.searchedData?.searchedChannels,
  }));
  const renderItemSearchChannels = useCallback(
    ({ item }) => {
      if (
        item?._source?.type === 'T' &&
        item?._source?.status === 'PRIVATE'
        // &&
        // props?.channelsState?.teamIdAndTypeMapping[item?._source?.id] ===
        //   undefined
      ) {
        return null; // Do not render the component
      }
      return <SearchedChannelCardV2 item={item} />;
    },
    [searchedChannels],
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={searchedChannels}
        renderItem={renderItemSearchChannels}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        removeClippedSubviews={true}
        maxToRenderPerBatch={20}
        initialNumToRender={20}
      />
    </View>
  );
};

export const SearchedChannelsListV2 = React.memo(SearchChannelListComponentV2);
