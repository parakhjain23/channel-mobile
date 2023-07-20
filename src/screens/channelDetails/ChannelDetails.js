import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import SearchBox from '../../components/searchBox';
import {getChannelsByQueryStart} from '../../redux/actions/channels/ChannelsByQueryAction';
import {
  addUserToChannelStart,
  removeUserFromChannelStart,
} from '../../redux/actions/channelActivities/inviteUserToChannelAction';
import {useTheme} from '@react-navigation/native';
import {makeStyles} from './Styles';
import FastImage from 'react-native-fast-image';
import {Throttling} from '../../utils/Throttling';

const ChannelDetailsScreen = ({
  route,
  orgsState,
  userInfoState,
  getChannelsByQueryStartAction,
  channelsByQueryState,
  removeUserFromChannelAction,
  addUsersToChannelAction,
  channelsState,
}) => {
  console.log('channel details');
  const [searchValue, setsearchValue] = useState('');
  const {teamId, channelName} = route?.params;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const RED_COLOR = '#FF2E2E';
  const GREEN_COLOR = '#00A300';
  const Purpose = channelsState?.channelIdAndDataMapping?.[teamId]?.purpose;
  const CreatedBy = channelsState?.channelIdAndDataMapping[teamId]?.createdBy;
  const changeText = value => {
    setsearchValue(value);
  };
  const fetchData = () => {
    if (searchValue?.length > 0) {
      getChannelsByQueryStartAction(
        searchValue,
        userInfoState?.user?.id,
        orgsState?.currentOrgId,
      );
    }
  };
  useEffect(() => {
    Throttling(fetchData, 300);
  }, [searchValue]);

  const RenderUsers = useCallback(
    ({item}) => {
      return (
        item?._source?.type == 'U' &&
        item?._source?.isEnabled && (
          <View style={styles.userToAddContainer} key={item}>
            <View style={styles.leftContainer}>
              <FastImage
                source={{
                  uri: orgsState?.userIdAndImageUrlMapping[
                    item?._source?.userId
                  ]
                    ? orgsState?.userIdAndImageUrlMapping[item?._source?.userId]
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
                  priority: FastImage.priority.normal,
                }}
                style={styles.imageIcon}
              />
              <Text style={styles.memberText}>{item?._source?.title}</Text>
            </View>
            {channelsState?.channelIdAndDataMapping[teamId]?.userIds.includes(
              item?._source?.userId,
            ) ? (
              <TouchableOpacity
                onPress={() => {
                  removeUserFromChannelAction(
                    [{userId: item?._source?.userId}],
                    channelsState?.channelIdAndDataMapping[teamId]?._id,
                    orgsState?.currentOrgId,
                    userInfoState?.accessToken,
                  );
                }}
                style={[
                  styles.button,
                  {borderColor: RED_COLOR, backgroundColor: RED_COLOR},
                ]}>
                <Text style={{color: '#ffffff', fontWeight: '500'}}>
                  REMOVE
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  addUsersToChannelAction(
                    [{userId: item?._source?.userId}],
                    channelsState?.channelIdAndDataMapping[teamId]?._id,
                    orgsState?.currentOrgId,
                    userInfoState?.accessToken,
                  );
                }}
                style={[
                  styles.button,
                  {borderColor: GREEN_COLOR, backgroundColor: GREEN_COLOR},
                ]}>
                <Text style={{color: '#ffffff', fontWeight: '500'}}>ADD</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      );
    },
    [channelsByQueryState?.channels, channelsState?.channelIdAndDataMapping],
  );

  const RenderItem = ({item, index}) => {
    const userId = item;
    return (
      <View style={styles.memberContainer} key={index}>
        <View style={styles.leftContainer}>
          <FastImage
            source={{
              uri: orgsState?.userIdAndImageUrlMapping[userId]
                ? orgsState?.userIdAndImageUrlMapping[userId]
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
              priority: FastImage.priority.normal,
            }}
            style={styles.imageIcon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.memberText}>
              {orgsState?.userIdAndNameMapping[item]}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            removeUserFromChannelAction(
              [{userId: item}],
              channelsState?.channelIdAndDataMapping[teamId]?._id,
              orgsState?.currentOrgId,
              userInfoState?.accessToken,
            );
          }}
          style={[
            styles.button,
            {
              borderColor: RED_COLOR,
              backgroundColor: RED_COLOR,
              justifyContent: 'flex-end',
            },
          ]}>
          <Text style={styles.removeText}>REMOVE</Text>
        </TouchableOpacity>
      </View>
    );
  };
  console.log(channelsByQueryState?.channels?.length);
  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors?.primaryColor}}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <View style={styles.content}>
          {Purpose?.length > 0 && (
            <Text style={styles.text}>
              Purpose:{' '}
              {channelsState?.channelIdAndDataMapping[
                teamId
              ]?.purpose?.toString()}
            </Text>
          )}
          {CreatedBy?.length > 0 && (
            <Text>
              <Text style={styles.text}>
                Created by:{' '}
                {
                  orgsState?.userIdAndNameMapping[
                    channelsState?.channelIdAndDataMapping[teamId]?.createdBy
                  ]
                }
              </Text>
            </Text>
          )}

          <Text style={styles.header}>Add Members </Text>
          <SearchBox
            searchValue={searchValue}
            changeText={changeText}
            isSearchFocus={false}
          />

          {searchValue != '' &&
            channelsByQueryState?.channels?.length > 0 &&
            channelsByQueryState?.channels?.map((item, index) => {
              return <RenderUsers item={item} key={index} />;
            })}

          {searchValue?.length === 0 && (
            <View style={{flex: 1}}>
              <Text style={styles.header}>Members:</Text>
              {channelsState?.channelIdAndDataMapping[teamId]?.userIds?.map(
                (item, index) => {
                  return <RenderItem item={item} index={index} key={index} />;
                },
              )}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
const mapStateToProps = state => ({
  userInfoState: state.userInfoReducer,
  channelsState: state.channelsReducer,
  orgsState: state.orgsReducer,
  appInfoState: state.appInfoReduer,
  channelsByQueryState: state.channelsByQueryReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    getChannelsByQueryStartAction: (query, userToken, orgId) =>
      dispatch(getChannelsByQueryStart(query, userToken, orgId)),
    removeUserFromChannelAction: (userIds, teamId, orgId, accessToken) =>
      dispatch(removeUserFromChannelStart(userIds, teamId, orgId, accessToken)),
    addUsersToChannelAction: (userIds, teamId, orgId, accessToken) =>
      dispatch(addUserToChannelStart(userIds, teamId, orgId, accessToken)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelDetailsScreen);
