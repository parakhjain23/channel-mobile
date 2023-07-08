import {StyleSheet} from 'react-native';
import {s, vs, ms, mvs} from 'react-native-size-matters';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    emojiContainer: {
      minHeight: 40,
      width: '50%',
      paddingVertical: 3,
      paddingHorizontal: 10,
      backgroundColor: 'white',
      borderRadius: 25,
      flexDirection: 'row',
      alignItems: 'center',
    },
    emojiIcon: {
      fontSize: 30,
      color: '#ffffff',
      marginRight: 7,
    },
    emojiPlusText: {
      color: 'black',
      fontSize: 30,
      marginLeft: 5,
    },
    text: {
      color: colors.color,
    },
    optionsText: {
      fontSize: 16,
      color: 'black',
    },
    inputWithReply: {
      padding: ms(10),
    },
    inputWithoutReply: {
      padding: ms(20),
      alignItems: 'center',
      borderWidth: ms(1),
      borderRadius: ms(10),
      borderColor: 'grey',
    },
    inputWithReplyContainer: {
      borderWidth: ms(1),
      borderColor: 'gray',
      borderRadius: ms(10),
    },
    replyMessageInInput: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: ms(5),
      borderWidth: ms(0.25),
      borderRadius: ms(5),
      padding: ms(5),
      backgroundColor: '#d9d9d9',
    },
    repliedContainer: {
      padding: ms(5),
      backgroundColor: '#F5F5F5',
      borderRadius: ms(3),
      marginBottom: mvs(4),
      borderWidth: s(0.3),
      maxHeight: ms(80),
      borderLeftColor: '#b38b6d',
      borderLeftWidth: ms(4),
      flexDirection: 'row',
      overflow: 'hidden',
    },
    option: {
      margin: ms(8),
      backgroundColor: 'yellow',
    },
    actionText: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: mvs(10),
    },
    container: {
      borderRadius: ms(5),
      maxWidth: '90%',
    },
    sentByMe: {
      alignSelf: 'flex-end',
      borderColor: 'transparent',
    },
    received: {
      alignSelf: 'flex-start',
      marginLeft: 0,
      borderColor: 'gray',
    },
    avatar: {
      width: ms(32),
      height: mvs(32),
      borderRadius: ms(16),
      marginHorizontal: ms(4),
    },
    nameText: {
      fontWeight: '600',
      fontSize: 16,
      marginBottom: 2,
    },
    messageText: {
      fontSize: 16,
    },
    timeText: {
      fontSize: 11,
    },
    imageAttachContainer: {
      marginVertical: 5,
      alignItems: 'center',
    },
    imageAttachment: {
      height: ms(150),
      width: ms(150),
    },
    audioAttachContainer: {
      flexDirection: 'row',
      height: 50,
      width: ms(280),
    },
    docContainer: {
      borderWidth: ms(0.5),
      borderColor: 'gray',
      borderRadius: ms(5),
      padding: ms(10),
    },
    docContentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    attachmentIcon: {
      width: 40,
      height: 40,
      marginRight: 15,
    },
  });
