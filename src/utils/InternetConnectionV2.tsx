import NetInfo from '@react-native-community/netinfo';
import React, { useEffect } from 'react';
import { sendGlobalMessageApi } from '../api/messages/sendMessageApi';
import { networkStatus } from '../redux/actions/network/NetworkActions';
import { $ReduxCoreType } from '../types/reduxCoreType';
import { useDispatch } from 'react-redux';
import { updateAppInfoState } from '../reduxV2/appInfo/appInfoSlice';
import { useCustomSelector } from '../utils/deepCheckSelector.js';


export const InternetConnectionV2 = () => {
  const { isInternetConnected, isSocketConnected, chatStateData } = useCustomSelector((state: $ReduxCoreType) => ({
    isInternetConnected: state?.appInfo?.isInternetConnected,
    isSocketConnected: state?.appInfo?.isSocketConnected,
    chatStateData: state?.chats?.data
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state?.isConnected) {
        dispatch(updateAppInfoState({ isInternetConnected: true }))
      } else {
        dispatch(updateAppInfoState({ isInternetConnected: false }))
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  // useEffect(() => {
  //   if (isSocketConnected) {
  //     Object.keys(chatStateData)?.map(async teamId => {
  //       while (chatStateData[teamId]?.globalMessagesToSend?.length) {
  //         await sendGlobalMessageApi(
  //           chatStateData[teamId]?.globalMessagesToSend?.shift(),
  //         );
  //       }
  //     });
  //   }
  // }, [isInternetConnected, isSocketConnected]);

  return null;
};