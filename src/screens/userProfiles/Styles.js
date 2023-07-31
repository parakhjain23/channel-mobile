import {StyleSheet} from 'react-native';

export const makeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: colors.primaryColor,
      // paddingHorizontal: 20,
    },
    image: {
      width: 250,
      height: 250,
      borderRadius: 75,
      borderWidth: 3,
      borderColor: colors?.secondaryColor,
    },
    infoContainer: {
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors?.secondaryColor,
    },
    name: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors?.textColor,
      marginBottom: 15,
      marginTop: 15,
    },
    email: {
      fontSize: 18,
      color: colors?.textColor,
      marginBottom: 15,
      flexDirection: 'row',
    },
    phone: {
      fontSize: 18,
      color: colors?.textColor,
      marginBottom: 20,
    },
    button: {
      minHeight: 40,
      maxWidth: 350,
      borderRadius: 3,
      borderWidth: 2,
      borderColor: colors?.color,
      justifyContent: 'center',
      padding: 10,
    },
    callButton: {
      backgroundColor: colors?.color,
    },
    messageButton: {
      backgroundColor: colors?.color,
    },
    buttonText: {
      fontSize: 16,
      color: colors?.primaryColor,
      textAlign: 'center',
    },
    buttonTextWhite: {
      color: colors?.primaryColor,
    },
  });
