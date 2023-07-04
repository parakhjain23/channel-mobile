import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    mentionsList: {
      maxHeight: 250,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 0.7,
      borderTopColor: 'grey',
      borderRadius: 10,
      margin: 2,
      padding: 2,
    },
    appIcon: {
      height: 30,
      width: 30,
      marginRight: 4,
    },
    title: {
      fontSize: 16,
      margin: 4,
      color: colors.textColor,
    },
    description: {
      fontSize: 13,
      marginLeft: 4,
      color: colors.textColor,
    },
  });
