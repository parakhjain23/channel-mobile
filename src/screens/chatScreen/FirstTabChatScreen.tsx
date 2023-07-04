import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const FirstTabChatScreen = () => {
  const {colors} = useTheme();
  const styles = makeStyle(colors);
  return (
    <View style={styles.container}>
      <Image source={require('../../assests/images/appIcon/icon72size.png')} />
      <Text style={styles.welcomeText}>Welcome To channel</Text>
      <Text style={styles.text}>You Are Awesome :)</Text>
    </View>
  );
};

const makeStyle = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primaryColor,
    },
    welcomeText: {
      color: colors?.color,
      fontSize: 18,
      fontWeight: '500',
    },
    text: {
      color: colors?.color,
    },
  });

export default FirstTabChatScreen;
