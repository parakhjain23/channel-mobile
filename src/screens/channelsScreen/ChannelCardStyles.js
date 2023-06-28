import {StyleSheet} from 'react-native';
export const makeStyles = colors =>
  StyleSheet.create({
    taskContainer: {
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
    },
    cardStyle: {
      flexDirection: 'row',
      alignItems: 'center',
      // flexWrap: 'wrap',
      overflow: 'hidden',
    },
    task: {
      width: '93%',
      justifyContent: 'center',
      paddingLeft: 10,
      backgroundColor: colors?.primaryColor,
      borderRadius: 10,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: 'gray',
      // Shadow for iOS
      shadowOpacity: 0.05,
      shadowOffset: {
        width: 0,
        height: 20,
      },
      shadowRadius: 15,
      // Shadow for Android
      elevation: 5,
    },
    taskTitle: {
      fontSize: 16,
      color: colors?.textColor,
      marginLeft: 10,
    },
    iconContainer: {
      position: 'absolute',
      right: '10%',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
