import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import * as RootNavigation from '../navigation/RootNavigation';
import {useTheme} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {DEVICE_TYPES} from '../constants/Constants';
import {connect, useSelector} from 'react-redux';
import { useCustomSelector } from '../utils/deepCheckSelector';
import { $ReduxCoreType } from '../types/reduxCoreType';
import { appInfoReducer } from '../redux/reducers/app/AppInfoReducer';

const HeaderComponent = ({
  chatHeaderTitle,
  userId,
  channelType,
  teamId,
  // orgState,
  // channelsState,
  // userInfoState,
  // appInfoState,
  // setChatDetailsForTab,
}) => {
  const {deviceType,teamIdAndDataMapping,allUserInfo,userIdAndTeamMapping}=useCustomSelector((state:$ReduxCoreType)=>({
    deviceType:state.appInfo.deviceType,
    teamIdAndDataMapping:state.channels.teamIdAndDataMapping,
    allUserInfo:state.allUsers,
    userIdAndTeamMapping:state.channels.userIdAndTeamIdMapping
  }))
  const {colors} = useTheme();
  // const accessToken = appInfo?.accessToken;
  // const deviceType = appInfo?.deviceType;
  const handleGoBack = () => {
    RootNavigation?.goBack();
  };
  // console.log(
  //   chatHeaderTitle,
  //   userId,
  //   channelType,
  //   teamId,
  //   '--------HEADER SCREEN-------------',
  // );
  const HeaderTitle = ({chatHeaderTitle}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 1,
          marginRight: -7,
        }}>
        <Text
          style={{
            color: colors?.color,
            fontSize: 13,
            textAlignVertical: 'center',
          }}
          numberOfLines={1}
          ellipsizeMode="tail">
          {chatHeaderTitle?.toString()?.slice(0, 42)}
          <Entypo name="chevron-small-right" color={colors?.color} size={13} />
        </Text>
      </View>
    );
  };
  const onTitlePress = (chatHeaderTitle, userId, channelType, teamId) => {
    channelType === 'DIRECT_MESSAGE'
      ? RootNavigation.navigate('UserProfiles', {
          displayName: chatHeaderTitle,
          userId: userId,
          // setChatDetailsForTab: setChatDetailsForTab,
        })
      : RootNavigation.navigate('Channel Details', {
          channelName: chatHeaderTitle,
          teamId: teamId,
        });
  };
  const headerHeight = 60;
  const MainComponent = () => {
    return (
      <View
        style={{
          // flex: 1,
          flexDirection: 'row',
          minHeight: headerHeight,
          backgroundColor: colors?.headerColor,
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
        }}>
        {deviceType != DEVICE_TYPES[1] && (
          <TouchableOpacity
            onPress={handleGoBack}
            style={{
              paddingLeft: 15,
              paddingRight: 50,
              paddingVertical: headerHeight / 3,
              position: 'absolute',
              left: 0,
              // bottom: 1,
              zIndex: 1,
            }}>
            <Icon name="chevron-left" size={15} color={colors?.color} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={{flex: 1}} // don't remove it bcz of this full header is touchable
          onPress={() => {
            onTitlePress(
              chatHeaderTitle,
              userId,
              channelType,
              userIdAndTeamMapping.teamId
            );
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 1,
            }}>
            {channelType == 'DIRECT_MESSAGE' ? (
              <UserImageComponent userId={userId} allUserInfo={allUserInfo}/>
            ) : (
              (
                <ChannelHeaderImage
                  allUserInfo={allUserInfo}
                  teamIdAndDataMapping={teamIdAndDataMapping}
                  // allUserInfo={allUserInfo}
                  teamId={teamId}
                  // orgState={orgState}
                  // channelState={channelState}
                />
              )
            )}
            <HeaderTitle chatHeaderTitle={chatHeaderTitle} />
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const platform = Platform.OS === 'ios' ? 'ios' : 'android';
  return (
    <>
      {platform !== 'ios' && deviceType != DEVICE_TYPES[1] ? (
        <SafeAreaView style={{backgroundColor: colors?.headerColor}}>
          <MainComponent />
        </SafeAreaView>
      ) : (
        <MainComponent />
      )}
    </>
  );
};

export const UserImageComponent = ({
  userId,
  allUserInfo,
  width = 30,
  height = 30,
  // channelState,
}) => {
  return (
    <FastImage
      source={{
        uri: allUserInfo.userIdAndDataMapping[userId]?.avatar        
        ? allUserInfo.userIdAndDataMapping[userId]?.avatar 
        // orgState?.userIdAndImageUrlMapping[userId]
          // orgState?.userIdAndImageUrlMapping[userId]
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
        priority: FastImage.priority.normal,
      }}
      style={{
        width: width,
        height: height,
        borderRadius: 50,
      }}
    />
  );
};
const ChannelImageComponent = ({
  allUserInfo,
  teamIdAndDataMapping,
  // allUserInfoState,
  teamId,
  // orgState,
  // channelsState,
  // channelState,

}) => {
  const {colors} = useTheme();
  // console.log('images----898998', teamIdAndDataMapping,"team id&&&&&&  ---",teamId);
  const userImagesArray =
  teamIdAndDataMapping?.[teamId]?.userIds || []
    // console.log("image array---000000",userImagesArray)
    
    // channelsState?.channelIdAndDataMapping?.[teamId]?.userIds || [];
  let usersImages = [];
  for (let i = 0; usersImages?.length != 7; i++) {
    if (i > userImagesArray?.length) {
      break;
    }
    // const UserImage = orgState?.userIdAndImageUrlMapping[userImagesArray[i]];
    
    const userImages=allUserInfo?.userIdAndDataMapping[userImagesArray[i]]?.avatar
    if (userImages) {
      // console.log("katoon!!!!",userImages);
      usersImages?.push(userImagesArray[i]);
    }
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          // alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* first Left Image  */}
          <View style={{marginTop: -5, marginRight: 3}}>
            {usersImages[5] != null && (
              <UserImageComponent
                userId={usersImages[5]}
                allUserInfo={allUserInfo}
                width={8}
                height={8}
                // orgState={State}
              />
            )}
          </View>
          <View>
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              {usersImages[3] != null && (
                <UserImageComponent
                  userId={usersImages[3]}
                  allUserInfo={allUserInfo}
                  width={12}
                  height={12}
                  // orgState={orgState}
                />
              )}
            </View>
            <View style={{marginTop: 2, marginLeft: -3}}>
              {usersImages[1] != null && (
                <UserImageComponent
                  userId={usersImages[1]}
                  allUserInfo={allUserInfo}
                  width={14}
                  height={14}
                  // orgState={orgState}
                />
              )}
            </View>
          </View>
        </View>
        {/* centered Image */}
        <View style={{marginHorizontal: 3}}>
          {usersImages[0] != null && (
            <UserImageComponent
              userId={usersImages[0]}
              allUserInfo={allUserInfo}
              width={28}
              height={28}
              // orgState={orgState}
            />
          )}
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <View style={{marginBottom: 1, marginLeft: 2}}>
              {usersImages[2] != null && (
                <UserImageComponent
                  userId={usersImages[2]}
                  allUserInfo={allUserInfo}
                  width={14}
                  height={14}
                  // orgState={orgState}
                />
              )}
            </View>
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              {usersImages[4] != null && (
                <UserImageComponent
                  userId={usersImages[4]}
                  allUserInfo={allUserInfo}
                  width={12}
                  height={12}
                  // orgState={orgState}
                />
              )}
            </View>
          </View>
          <View style={{marginBottom: -5}}>
            {usersImages[6] != null && (
              <UserImageComponent
                userId={usersImages[6]}
                allUserInfo={allUserInfo}
                width={8}
                height={8}
                // orgState={orgState}
              />
            )}
          </View>
        </View>
      </View>
      {userImagesArray?.length - usersImages?.length > 0 && (
        <View style={{marginLeft: 3}}>
          <Text style={{color: colors?.color, fontSize: 8}}>
            +{userImagesArray?.length - usersImages?.length}
          </Text>
        </View>
      )}
    </View>
  );
};

// const mapStateToProps = state => ({
//   userInfoState: state.userInfoReducer,
//   channelsState: state.channelsReducer,
//   orgState: state.orgsReducer,
//   appInfoState: state.appInfoReducer,
// });
// const mapStateToProps = state => ({
//   userInfoState: state.userInfoReducer,
//   channelsState: state.channelsReducer,
//   orgState: state.orgsReducer,
//   appInfoState: state.appInfoReducer,

//   deviceType:state.appInfo.deviceType,
//   channelState:state.channels.channels,
//   allUserInfo:state.allUsers,
//   teamId:state.channels.userIdAndTeamIdMapping
// });
export const ChannelHeaderImage = React.memo(ChannelImageComponent);
export const HeaderV2 = React.memo(HeaderComponent);

// export const HeaderV2 = connect(
//   // mapStateToProps,
//   null,
// )(React.memo(HeaderComponent));
