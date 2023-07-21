import {View, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Modal} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import ActionList from '../actionList/ActionList';
import {LongPressCardMemo} from '../longPressCard/LongPressCard';

const {height} = Dimensions.get('window');

const ActionModal = props => {
  const {
    setShowActions,
    chat,
    userInfoState,
    orgState,
    deleteMessageAction,
    chatState,
    setreplyOnMessage,
    setrepliedMsgDetails,
    flatListRef,
    channelType,
    setCurrentSelectedChatCard,
    currentSelectChatCard,
  } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      onRequestClose={() => setShowActions(false)}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => setShowActions(false)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => setShowActions(false)}>
            <View style={styles.cardContainer}>
              <LongPressCardMemo
                chat={chat}
                userInfoState={userInfoState}
                orgState={orgState}
                deleteMessageAction={deleteMessageAction}
                chatState={chatState}
                setreplyOnMessage={setreplyOnMessage}
                setrepliedMsgDetails={setrepliedMsgDetails}
                flatListRef={flatListRef}
                channelType={channelType}
                setShowActions={setShowActions}
                setCurrentSelectedChatCard={setCurrentSelectedChatCard}
              />
              <ActionList
                sentByMe={
                  currentSelectChatCard?.senderId == userInfoState?.user?.id
                    ? true
                    : false
                }
                chat={currentSelectChatCard}
                setreplyOnMessage={setreplyOnMessage}
                setrepliedMsgDetails={setrepliedMsgDetails}
                setShowActions={setShowActions}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxHeight: height - 300,
  },
});
export default ActionModal;
