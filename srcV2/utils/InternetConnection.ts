import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { sendGlobalMessageApi } from '../api/messages/sendMessageApi';
import { networkStatus } from '../redux/actions/network/NetworkActions';

const InternetConnection = ({
  networkState,
  chatState,
  socketState,
  networkStatusAction,
}: PropsFromRedux) => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      if (state?.isConnected) {
        networkStatusAction(true);
      } else {
        networkStatusAction(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (socketState?.isSocketConnected) {
      Object.keys(chatState?.data)?.map(async (teamId: string) => {
        while (chatState?.data[teamId]?.globalMessagesToSend?.length) {
          await sendGlobalMessageApi(
            chatState?.data[teamId]?.globalMessagesToSend?.shift(),
          );
        }
      });
    }
  }, [networkState?.isInternetConnected, socketState?.isSocketConnected]);

  return null;
};

const mapStateToProps = (state: any) => ({
  networkState: state.networkReducer,
  chatState: state.chatReducer,
  socketState: state.socketReducer,
});

const mapDispatchToProps = {
  networkStatusAction: (data: boolean) => networkStatus(data),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(InternetConnection);
