import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
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
import {ResultNotFound} from '../../assests/images/attachments';
import { useCustomSelector } from '../../utils/deepCheckSelector';
import {$ReduxCoreType} from '../../../types/reduxCoreType';
import { getChannelsByQueryStartV2 } from '../../reduxV2/searchedData/searchedDataSlice';

const ChannelDetailsScreenV2 = ({
  route,
//   channelsByQueryState,
}) => {
  const [searchValue, setsearchValue] = useState('');
  const {teamId, channelName} = route?.params;
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const RED_COLOR = '#FF2E2E';
  const GREEN_COLOR = '#00A300';
//   const channelIdAndDataMapping = channelsState?.channelIdAndDataMapping;
//   const Purpose = channelIdAndDataMapping?.[teamId]?.purpose;
//   const CreatedBy = channelIdAndDataMapping?.[teamId]?.createdBy;
  const changeText = value => {
    setsearchValue(value);
  };
  const dispatch = useDispatch();

  const {teamIdAndDataMapping, userIdAndDataMapping, orgInfo, appInfo, searchedChannels} = useCustomSelector((state : $ReduxCoreType)=>({
    teamIdAndDataMapping:state?.channels?.teamIdAndDataMapping,
    userIdAndDataMapping: state?.allUsers?.userIdAndDataMapping,
    orgInfo: state?.orgs,
    appInfo: state?.appInfo,
    searchedChannels: state?.searchedData?.searchedChannels,
  }))
  const Purpose = teamIdAndDataMapping?.[teamId]?.purpose;
  const CreatedBy = teamIdAndDataMapping?.[teamId]?.createdBy;
  
//     const fetchData = () => {
//     if (searchValue?.length > 0) {
//       getChannelsByQueryStartAction(
//         searchValue,
//         userInfoState?.user?.id,
//         orgsState?.currentOrgId,
//       );
//     }
// };
    const fetchData = () => {
    if (searchValue?.length > 0) {
        dispatch(getChannelsByQueryStartV2({
          query: searchValue,
          accessToken: appInfo?.accessToken,
          orgId: orgInfo?.currentOrgId
        }))
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
                // source={{
                //   uri: orgsState?.userIdAndImageUrlMapping[
                //     item?._source?.userId
                //   ]
                //     ? orgsState?.userIdAndImageUrlMapping[item?._source?.userId]
                //     : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
                //   priority: FastImage.priority.normal,
                // }}
                source={{
                  uri: userIdAndDataMapping?.[
                    item?._source?.userId
                  ]?.avatar
                    ? userIdAndDataMapping?.[item?._source?.userId]?.avatar
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
                  priority: FastImage.priority.normal,
                }}
                style={styles.imageIcon}
              />
              <Text style={styles.memberText}>{item?._source?.title}</Text>
            </View>
            {teamIdAndDataMapping?.[teamId]?.userIds.includes(
              item?._source?.userId,
            ) ? (
              <TouchableOpacity
                // onPress={() => {
                //   removeUserFromChannelAction(
                //     [{userId: item?._source?.userId}],
                //     channelIdAndDataMapping[teamId]?._id,
                //     orgsState?.currentOrgId,
                //     userInfoState?.accessToken,
                //   );
                // }}
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
                // onPress={() => {
                //   addUsersToChannelAction(
                //     [{userId: item?._source?.userId}],
                //     channelIdAndDataMapping[teamId]?._id,
                //     orgsState?.currentOrgId,
                //     userInfoState?.accessToken,
                //   );
                // }}
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
    [searchedChannels, teamIdAndDataMapping],
  );

  const RenderItem = ({item, index}) => {
    const userId = item;
    return (
      <View style={styles.memberContainer} key={index}>
        <View style={styles.leftContainer}>
          <FastImage
            source={{
              uri: userIdAndDataMapping[userId]?.avatar
                ? userIdAndDataMapping[userId]?.avatar
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
              priority: FastImage.priority.normal,
            }}
            style={styles.imageIcon}
          />
          <View style={styles.textContainer}>
            <Text style={styles.memberText}>
              {userIdAndDataMapping[item]?.displayName}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          // onPress={() => {
          //   removeUserFromChannelAction(
          //     [{userId: item}],
          //     teamIdAndDataMapping[teamId]?._id,
          //     orgInfo?.currentOrgId,
          //     appInfo?.accessToken
          //   );
          // }}
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

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: colors?.primaryColor}}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always">
      <View style={styles.container}>
        <View style={styles.content}>
          {Purpose?.length > 0 && (
            <Text style={styles.text}>
              Purpose: {Purpose?.toString()}
            </Text>
          )}
          {CreatedBy?.length > 0 && (
            <Text>
              <Text style={styles.text}>
                Created by:{' '}
                {
                  userIdAndDataMapping[CreatedBy]?.displayName
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
            searchedChannels?.length === 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 60,
                  marginBottom: 20,
                }}>
                <FastImage
                  source={ResultNotFound}
                  style={{height: 200, width: 200}}
                />
              </View>
              // <Text>No users found.</Text>
            )}
          {searchValue != '' &&
            searchedChannels?.length > 0 &&
            searchedChannels?.map((item, index) => {
              return <RenderUsers item={item} key={index} />;
            })}

          {searchValue?.length === 0 && (
            <View style={{flex: 1}}>
              <Text style={styles.header}>Members:</Text>
              {/* {channelIdAndDataMapping?.[teamId]?.userIds?.map((item, index) => {
                return <RenderItem item={item} index={index} key={index} />;
              })} */}
              {teamIdAndDataMapping?.[teamId]?.userIds?.map((item, index) => {
                return <RenderItem item={item} index={index} key={index} />;
              })}

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
//   channelsByQueryState: state.channelsByQueryReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    // getChannelsByQueryStartAction: (query, userToken, orgId) =>
    //   dispatch(getChannelsByQueryStart(query, userToken, orgId)),
    removeUserFromChannelAction: (userIds, teamId, orgId, accessToken) =>
      dispatch(removeUserFromChannelStart(userIds, teamId, orgId, accessToken)),
    addUsersToChannelAction: (userIds, teamId, orgId, accessToken) =>
      dispatch(addUserToChannelStart(userIds, teamId, orgId, accessToken)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChannelDetailsScreenV2);
