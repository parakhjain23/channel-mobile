import {StyleSheet} from 'react-native';

const RED_COLOR = '#FF2E2E';
const GREEN_COLOR = '#00A300';
export const makeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors?.primaryColor,
    },
    content: {
      padding: 20,
      flex: 1,
    },
    text: {
      fontSize: 16,
      color: colors?.textColor,
      marginBottom: 10,
    },
    header: {
      fontSize: 18,
      fontWeight: '500',
      color: colors?.textColor,
      marginBottom: 10,
      marginTop: 10,
    },
    button: {
      borderWidth: 1,
      padding: 5,
      borderRadius: 5,
    },
    memberContainer: {
      flexDirection: 'row',
      minHeight: 30,
      // borderWidth: 1,
      // borderColor: '#ccc',
      // borderRadius: 8,
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginBottom: 10,
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'gray',
    },
    userToAddContainer: {
      flexDirection: 'row',
      minHeight: 30,
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop: 10,
      justifyContent: 'space-between',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: 'gray',
    },
    memberText: {
      fontSize: 16,
      color: colors?.textColor,
    },
    leftContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageIcon: {
      width: 30,
      height: 30,
      borderRadius: 50,
      marginRight: 10,
    },
    textContainer: {
      flexDirection: 'row',
      flex: 1,
      maxWidth: '70%', // Adjust the maximum width as desired
    },
    removeText: {color: '#ffffff', fontWeight: '500'},
  });
