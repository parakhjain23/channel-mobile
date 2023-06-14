import React from 'react';
import {Text} from 'react-native';
import {Animated, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {resetUnreadCountStart} from '../../../redux/actions/channels/ChannelsAction';
import {closeChannelStart} from '../../../redux/actions/channels/CloseChannelActions';
const RightSwipeActionComponent = ({
  scale,
  item,
  Name,
  swipeableRef,
  markAsUnreadAction,
  closeChannelAction,
  channelsState,
  userInfoState,
}) => {
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        transform: [{scale}],
      }}>
      {item?.type != 'DIRECT_MESSAGE' &&
        item?.type != 'DEFAULT' &&
        item?.type != 'PERSONAL' && (
          <TouchableOpacity
            style={{
              backgroundColor: '#f44336',
              justifyContent: 'center',
              paddingHorizontal: 15,
              height: '100%',
            }}
            onPress={() => {
              closeChannelAction(
                Name,
                item?._id,
                item?.type,
                userInfoState?.accessToken,
              ),
                swipeableRef?.current?.close();
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 14,
                textAlign: 'center',
              }}>
              Close{'\n'}Channel
            </Text>
          </TouchableOpacity>
        )}
      {channelsState?.teamIdAndBadgeCountMapping[item?._id] == 0 && (
        <TouchableOpacity
          style={{
            backgroundColor: '#ff9800',
            justifyContent: 'center',
            paddingHorizontal: 15,
            height: '100%',
          }}
          onPress={() => {
            markAsUnreadAction(
              item?.orgId,
              userInfoState?.user?.id,
              item?._id,
              userInfoState?.accessToken,
              1,
              0,
            ),
              swipeableRef?.current?.close();
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 14,
              textAlign: 'center',
            }}>
            Mark as{'\n'}Unread
          </Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};
const mapStateToProps = state => ({
  userInfoState: state.userInfoReducer,
  channelsState: state.channelsReducer,
});
const mapDispatchToProps = dispatch => {
  return {
    markAsUnreadAction: (
      orgId,
      userId,
      teamId,
      accessToken,
      badgeCount,
      unreadCount,
    ) =>
      dispatch(
        resetUnreadCountStart(
          orgId,
          userId,
          teamId,
          accessToken,
          badgeCount,
          unreadCount,
        ),
      ),
    closeChannelAction: (name, teamId, type, accessToken) =>
      dispatch(closeChannelStart(name, teamId, type, accessToken)),
  };
};
export const RightSwipeAction = connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(RightSwipeActionComponent));
