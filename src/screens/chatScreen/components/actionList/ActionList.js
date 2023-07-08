import React from 'react';
import {Text, TouchableOpacity, Vibration, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {connect} from 'react-redux';
import {deleteMessageStart} from '../../../../redux/actions/chat/DeleteChatAction';
import {makeStyles} from './ActionList-Styles';
import ClipboardUtils from '../../../../components/CopyClipboard';

const ActionList = React.memo(
  ({
    sentByMe,
    chat,
    setreplyOnMessage,
    setrepliedMsgDetails,
    setShowActions,
    deleteMessageAction,
    userInfoState,
  }) => {
    const {colors} = useTheme();
    const styles = makeStyles(colors);

    const copyToClipboard = text => {
      ClipboardUtils.setContent(text);
      setShowActions(false);
    };

    const swipeFromLeftOpen = () => {
      Vibration.vibrate(30);
      setrepliedMsgDetails(chat);
      setreplyOnMessage(true);
      setShowActions(false);
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => copyToClipboard(chat?.content)}
          style={styles.option}>
          <Icon name="content-copy" size={20} color={colors.text} />
          <Text style={styles.optionText}>Copy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={swipeFromLeftOpen} style={styles.option}>
          <Icon name="reply" size={20} color={colors.text} />
          <Text style={styles.optionText}>Reply</Text>
        </TouchableOpacity>
        {sentByMe && (
          <TouchableOpacity
            onPress={() => {
              deleteMessageAction(userInfoState?.accessToken, chat?._id);
              setShowActions(false);
            }}
            style={styles.option}>
            <Icon name="delete" color="tomato" size={20} />
            <Text style={[styles.optionText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  },
);

const mapStateToProps = state => ({
  userInfoState: state.userInfoReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    deleteMessageAction: (accessToken, msgId) =>
      dispatch(deleteMessageStart(accessToken, msgId)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionList);
