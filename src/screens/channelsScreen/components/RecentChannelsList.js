import React, {useMemo, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useCallback} from 'react';
import {RenderChannels} from '../ChannelCard';
import {View} from 'react-native';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import * as RootNavigation from '../../../navigation/RootNavigation';

const RecentChannelsListComponent = React.memo(
  ({
    channelsState,
    onScroll,
    refreshing,
    onRefresh,
    setChatDetailsForTab,
    userInfoState,
    orgsState,
  }) => {
    console.log('recent channelt list');
    const memoizedData = useMemo(
      () => channelsState?.recentChannels || channelsState?.channels || [],
      [channelsState?.recentChannels, channelsState?.channels],
    );
    // const userId =
    //   item?.userIds[0] !== currentUserId ? item?.userIds[0] : item?.userIds[1];
    console.log(channelsState?.dmChannels);
    const headerDmComponent = () => {
      return (
        // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        //   <View style={{marginTop: Platform.OS == 'android' ? 30 : 0}}>
        //     <View
        //       style={{
        //         flexDirection: 'row',
        //         flexWrap: 'wrap',
        //         // backgroundColor: 'blue',
        //       }}>
        //       {channelsState?.dmChannels?.map(
        //         (user, index) => (
        //           (userid =
        //             user?.userIds[0] !== userInfoState?.user?.id
        //               ? user?.userIds[0]
        //               : user?.userIds[1]),
        //           console.log(userid, '=-=-=-=-=-=-=-='),
        //           (
        //             <TouchableOpacity
        //               onPress={() =>
        //                 RootNavigation.navigate('Chat', {
        //                   chatHeaderTitle:
        //                     orgsState?.userIdAndDisplayNameMapping[userid],
        //                   teamId: user?._id,
        //                   channelType: 'DIRECT_MESSAGE',
        //                   userId: userInfoState?.user?.id,
        //                   searchedChannel: false,
        //                 })
        //               }>
        //               <View
        //                 key={index}
        //                 style={{
        //                   // width: '50%', // Each item takes 50% width to display two items per line
        //                   padding: 5,
        //                   alignItems: 'center',
        //                   // backgroundColor: 'red',
        //                 }}>
        //                 <View
        //                   style={{
        //                     width: 80,
        //                     height: 80,
        //                     borderRadius: 40,
        //                     overflow: 'hidden',
        //                   }}>
        //                   <Image
        //                     source={{
        //                       uri: orgsState?.userIdAndImageUrlMapping[userid],
        //                     }}
        //                     style={{
        //                       width: '100%',
        //                       height: '100%',
        //                       resizeMode: 'cover',
        //                     }}
        //                   />
        //                 </View>
        //                 <Text style={{marginTop: 10, color: 'white'}}>
        //                   {orgsState?.userIdAndDisplayNameMapping[userid]}
        //                 </Text>
        //               </View>
        //             </TouchableOpacity>
        //           )
        //         ),
        //       )}
        //     </View>
        //   </View>
        // </ScrollView>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: Platform.OS === 'android' ? 30 : 0,
          }}
          data={channelsState?.dmChannels}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            const userId =
              item.userIds[0] !== userInfoState?.user?.id
                ? item.userIds[0]
                : item.userIds[1];

            return (
              <TouchableOpacity
                onPress={() =>
                  RootNavigation.navigate('Chat', {
                    chatHeaderTitle:
                      orgsState?.userIdAndDisplayNameMapping[userId],
                    teamId: item._id,
                    channelType: 'DIRECT_MESSAGE',
                    reciverUserId: userId,
                    searchedChannel: false,
                  })
                }>
                <View
                  key={index}
                  style={{
                    padding: 5,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={{
                        uri: orgsState?.userIdAndImageUrlMapping[userId],
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                  <Text style={{marginTop: 10, color: 'white'}}>
                    {orgsState?.userIdAndDisplayNameMapping[userId]}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      );
    };
    const renderItemChannels = useCallback(
      ({item, index}) => {
        // console.log(index);
        return (
          !item?.isArchived &&
          index < 20 &&
          item?.type != 'DIRECT_MESSAGE' && (
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
          ListHeaderComponent={headerDmComponent}
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
const mapStateToProps = state => ({
  channelsState: state.channelsReducer,
  userInfoState: state.userInfoReducer,
  orgsState: state.orgsReducer,
});

export default RecentChannelsList = connect(
  mapStateToProps,
  null,
)(RecentChannelsListComponent);
