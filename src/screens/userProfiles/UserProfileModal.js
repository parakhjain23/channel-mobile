import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {Modalize} from 'react-native-modalize';
import UserProfiles from './UserProfiles';
import {useTheme} from '@react-navigation/native';

const UserProfileModal = ({
  userProfileModalizeRef,
  chatHeaderTitle,
  userId,
  setChatDetailsForTab,
}) => {
  const {colors} = useTheme();

  const closeUserProfileModal = () => {
    userProfileModalizeRef?.current?.close();
  };
  const HeaderComponent = () => {
    return (
      <View style={{alignItems: 'flex-end'}}>
        <Pressable
          onPress={closeUserProfileModal}
          style={{padding: 5, paddingLeft: 20}}>
          <Text style={{color: '#007AFF', fontSize: 16}}>Done</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <Modalize
      ref={userProfileModalizeRef}
      modalStyle={{
        marginTop: '15%',
        backgroundColor: colors?.modalColor,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
      onBackButtonPress={true}
      HeaderComponent={HeaderComponent}>
      <UserProfiles
        // displayName={chatHeaderTitle}
        userId={userId}
        setChatDetailsForTab={setChatDetailsForTab}
        userProfileModalizeRef={userProfileModalizeRef}
      />
    </Modalize>
  );
};

export default UserProfileModal;
