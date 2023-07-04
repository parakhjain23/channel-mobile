import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    optionText: {
      fontSize: 16,
      color: 'black',
      paddingHorizontal: 8,
    },
    container: {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      elevation: 5,
      shadowColor: colors.secondaryColor,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginHorizontal: 8,
      marginTop: 5,
      marginBottom: 10,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
    },
    deleteText: {
      color: 'tomato',
    },
  });
