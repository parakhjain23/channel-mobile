import {StyleSheet} from 'react-native';
export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {borderRadius: 6, padding: 1},
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.8,
      borderColor: 'grey',
      borderRadius: 6,
      padding: 6,
      backgroundColor: colors?.primaryColor,
    },
    mentionsList: {maxHeight: 250},
    userImage: {
      height: 20,
      width: 20,
      borderRadius: 50,
      marginRight: 8,
    },
  });
