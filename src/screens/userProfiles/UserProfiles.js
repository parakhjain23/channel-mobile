import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import {connect} from 'react-redux';
import {DEVICE_TYPES, IMAGE_BASE_URL} from '../../constants/Constants';
import {useNavigation, useTheme} from '@react-navigation/native';
import {makeStyles} from './Styles';
import {ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedLottieView from 'lottie-react-native';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {createNewDmChannelStart} from '../../redux/actions/channels/CreateNewDmChannelAction';
import {Button} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import signOut, {
  updateUserDetailsStart,
} from '../../redux/actions/user/userAction';
import {fetchSearchedUserProfileStart} from '../../redux/actions/user/searchUserProfileActions';
import ListFooterComponent from '../../components/ListFooterComponent';
import {launchGallery} from '../chatScreen/ImagePicker';

const UserProfile = ({
  userInfoState,
  channelsState,
  createDmChannelAction,
  signOutAction,
  orgsState,
  route,
  appInfoState,
  searchUserProfileAction,
  searchedUserInfoState,
  updateUserDetailsAction,
  userId,
  setChatDetailsForTab,
}) => {
  console.log('insider user profile screen', userId);
  // const {userId, setChatDetailsForTab} = route?.params;
  const [attachment, setAttachment] = useState([]);
  const [attachmentLoading, setAttachmentLoading] = useState(false);
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const teamId =
    channelsState?.userIdAndTeamIdMapping[
      searchedUserInfoState?.searchedUserProfile?.[userId]?.id
    ];
  const navigation = useNavigation();
  const currentUserId = userInfoState?.user?.id;
  useEffect(() => {
    if (
      userId !== currentUserId &&
      !searchedUserInfoState?.searchedUserProfile?.[userId]
    ) {
      searchUserProfileAction(userId, userInfoState?.accessToken);
    }
  }, []);

  const handleListItemPress = (
    teamId,
    channelType,
    userId,
    searchedChannel,
  ) => {
    setChatDetailsForTab({
      teamId: teamId,
      channelType: channelType,
      userId: userId,
      searchedChannel: searchedChannel,
    });
  };

  useEffect(() => {
    if (searchedUserInfoState?.searchedUserProfile?.[userId] != null) {
      if (teamId == undefined) {
        createDmChannelAction(
          userInfoState?.accessToken,
          orgsState?.currentOrgId,
          '',
          searchedUserInfoState?.searchedUserProfile?.[userId]?.id,
        );
      }
    }
  }, [searchedUserInfoState?.searchedUserProfile]);

  const {
    email: userEmail,
    firstName: userFirstName,
    lastName: userLastName,
    mobileNumber: userMobileNumber,
    avatarKey: userAvatarKey,
    displayName: userDisplayName,
    id: user_id,
  } = userId === currentUserId
    ? userInfoState?.user || {}
    : searchedUserInfoState?.searchedUserProfile?.[userId] || {};

  const Email = userEmail || '';
  const FirstName = userFirstName || '';
  const LastName = userLastName || '';
  const MobileNumber = userMobileNumber || '';
  const Avtar = userAvatarKey || '';
  const DisplayName = userDisplayName || '';
  const UserId = user_id || '';

  const _signOut = async () => {
    if (userInfoState?.siginInMethod == 'Google') {
      await GoogleSignin.signOut();
    }
    signOutAction();
  };
  useEffect(() => {
    if (attachment?.length == 1) {
      updateUserDetailsAction(userInfoState?.accessToken, userId, attachment);
      setAttachment([]);
    }
  }, [attachment]);
  const updatePhoto = () => {
    launchGallery(
      userInfoState?.accessToken,
      setAttachment,
      setAttachmentLoading,
    );
  };
  return (
    <View style={styles.container}>
      {searchedUserInfoState?.isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <AnimatedLottieView
            source={require('../../assests/images/attachments/loading.json')}
            loop
            autoPlay
            style={{height: s(100), width: s(100)}}
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              marginTop: 20,
              // flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Image
              source={{
                uri:
                  (Avtar && `${IMAGE_BASE_URL}${Avtar}`) ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
              }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 5,
                marginBottom: 20,
              }}
            />
            {userId == currentUserId &&
              (attachmentLoading ? (
                <ListFooterComponent />
              ) : (
                <Button title="Change Photo" onPress={updatePhoto} />
              ))}
          </View>
          <Text style={styles.name}>
            <Icon name="user" size={16} color={colors.textColor} />
            {'  '}
            {FirstName} {LastName}
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${Email}`)}>
            <Text style={[styles.email]}>
              <Icon name="envelope" size={16} color={colors.textColor} />
              {'  '}
              {Email}
            </Text>
          </TouchableOpacity>
          {searchedUserInfoState?.searchedUserProfile?.[userId]
            ?.mobileNumber && (
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${MobileNumber}`)}>
              <View style={styles.email}>
                <Text style={[styles.email]}>
                  <Icon name="phone" size={16} color={colors.textColor} />
                  {'  '}
                  {MobileNumber}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {userId != currentUserId && (
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                style={[styles.button, styles.messageButton]}
                onPress={async () => {
                  appInfoState.deviceType == DEVICE_TYPES[0]
                    ? navigation.navigate('Chat', {
                        chatHeaderTitle: DisplayName,
                        teamId: teamId,
                        channelType:
                          channelsState?.teamIdAndTypeMapping[teamId],
                        reciverUserId: UserId,
                      })
                    : (handleListItemPress(
                        teamId,
                        channelsState?.teamIdAndTypeMapping[teamId],
                        UserId,
                        false,
                      ),
                      navigation.goBack());
                }}>
                <Text style={[styles.buttonText, styles.buttonTextWhite]}>
                  Message {DisplayName}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      )}
      {userId == currentUserId && (
        <View
          style={{
            borderTopColor: 'gray',
            // borderTopWidth: 0.3,
            justifyContent: 'center',
            marginBottom: 40,
          }}>
          <Button title="Sign Out" onPress={_signOut} />
        </View>
      )}
    </View>
  );
};

const mapStateToPros = state => ({
  userInfoState: state.userInfoReducer,
  channelsState: state.channelsReducer,
  orgsState: state.orgsReducer,
  appInfoState: state.appInfoReducer,
  searchedUserInfoState: state.searchedUserInfoReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    searchUserProfileAction: (userId, token) =>
      dispatch(fetchSearchedUserProfileStart(userId, token)),
    createDmChannelAction: (token, orgId, title, reciverUserId) =>
      dispatch(createNewDmChannelStart(token, orgId, title, reciverUserId)),
    signOutAction: () => dispatch(signOut()),
    updateUserDetailsAction: (token, userId, attachment) =>
      dispatch(updateUserDetailsStart(token, userId, attachment)),
  };
};
export default connect(
  mapStateToPros,
  mapDispatchToProps,
)(React.memo(UserProfile));
