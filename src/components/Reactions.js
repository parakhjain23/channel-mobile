import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {connect, useSelector} from 'react-redux';
import {reactionOnChatStart} from '../redux/actions/chat/ReactionsActions';

const Reactions = React.memo(props => {
  const {reactionAction, chat, sentByMe, setShowActions} = props;
  const userInfoState = useSelector(state => state.userInfoReducer);

  const onPress = reaction => {
    if (reaction?.users?.includes(userInfoState?.user?.id)) {
      reactionAction(
        userInfoState?.accessToken,
        chat?.teamId,
        chat?._id,
        reaction.reaction_icon,
        reaction.reaction_name,
        reaction?.users.filter(userId => userId !== userInfoState?.user?.id),
        'remove',
        userInfoState?.user?.id,
      );
    } else {
      reactionAction(
        userInfoState?.accessToken,
        chat?.teamId,
        chat?._id,
        reaction.reaction_icon,
        reaction.reaction_name,
        reaction?.users.filter(userId => userId !== userInfoState?.user?.id),
        'add',
        userInfoState?.user?.id,
      );
    }
    sentByMe == undefined && setShowActions(false);
  };

  return (
    <View
      style={{
        alignSelf:
          sentByMe == undefined
            ? 'center'
            : sentByMe
            ? 'flex-end'
            : 'flex-start',
        backgroundColor: '#353535',
        paddingHorizontal: 3,
        paddingVertical: 1,
        bottom: 3,
        borderWidth: 1,
        borderRadius: 20,
        top: -5,
        flexDirection: 'row',
        maxWidth: '95%',
        // flex: 1,
        overflow: 'scroll',
      }}>
      {chat?.reactions?.map((reaction, index) => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingHorizontal: 3,
            alignItems: 'center',
          }}
          key={index}
          onPress={() => {
            onPress(reaction);
          }}>
          <Text style={{color: '#ffffff', fontSize: 16}} key={index}>
            {reaction.reaction_icon}
          </Text>
          {reaction.users.length > 1 && (
            <Text
              style={{
                color: '#E5E4E2',
                fontSize: 14,
                fontWeight: '700',
                marginRight: 2,
                marginLeft: -3,
              }}>
              {' '}
              {reaction.users.length}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
});
const mapDispatchToProps = dispatch => {
  return {
    reactionAction: (
      token,
      teamId,
      messageId,
      reaction_icon,
      reaction_name,
      userIds,
      actionTye,
      userId,
    ) =>
      dispatch(
        reactionOnChatStart(
          token,
          teamId,
          messageId,
          reaction_icon,
          reaction_name,
          userIds,
          actionTye,
          userId,
        ),
      ),
  };
};

export default connect(null, mapDispatchToProps)(Reactions);
