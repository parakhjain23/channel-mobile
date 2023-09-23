import {StyleSheet} from 'react-native';
export const makeStyles = colors =>
  StyleSheet.create({
    taskContainer: {
      width: '100%',
      alignItems: 'center',
      marginTop: 5,
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
    markUnreadButton: {
      backgroundColor: 'red',
      borderRadius: 50,
      minWidth: 12,
      height: 12,
    },
    unreadButton: {
      backgroundColor: '#73e1ff',
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderRadius: 5,
      overflow: 'hidden',
    },
    unreadButtonText: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      minWidth: 15,
      height: 20,
      lineHeight: 20,
    },
    channelIcon: {
      backgroundColor: '#D3D3D3',
      padding: 10,
      borderRadius: 50,
    },
    userIcon: {
      width: 30,
      height: 30,
      borderRadius: 50,
    },
  });
