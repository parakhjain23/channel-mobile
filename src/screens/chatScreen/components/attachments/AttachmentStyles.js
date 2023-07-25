import {StyleSheet} from 'react-native';
export const listStyles = colors =>
  StyleSheet.create({
    attachmentTile: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      borderRadius: 5,
      padding: 2,
      borderWidth: 0.5,
      borderColor: 'gray',
    },
    optionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 3,
    },
    attachIcon: {
      color: colors?.color,
      padding: 8,
    },
    text: {
      color: colors?.color,
    },
  });
