import React, { useEffect } from 'react';
import { getChatsReset } from '../../redux/actions/chat/ChatActions';
import SplashScreen from 'react-native-splash-screen';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCustomSelector } from '../../utils/deepCheckSelector';
import { $ReduxCoreType } from '../../types/reduxCoreType';
import { useDispatch } from 'react-redux';
import { resetAppInfoState, updateAppInfoState } from '../../reduxV2/appInfo/appInfoSlice';
import { resetChatState } from '../../reduxV2/chats/chatsSlice';
interface SplashScreenProps {
  setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SplashScreenComponentV2: React.FC<SplashScreenProps> = (props) => {
  const { setShowSplashScreen } = props
  const { appVersion, isInternetConnected } = useCustomSelector((state: $ReduxCoreType) => ({
    appVersion: state?.appInfo?.appVersion,
    isInternetConnected: state?.appInfo?.isInternetConnected,
  }))
  const dispatch = useDispatch()
  const checkForApiUpdate = async () => {
    const version = DeviceInfo.getReadableVersion();
    if (appVersion === '' || appVersion !== version) {
      await AsyncStorage.clear();
      dispatch(resetAppInfoState({}))
      dispatch(updateAppInfoState({ appVersion: version }))
    }
  };
  useEffect(() => {
    checkForApiUpdate();
    isInternetConnected && dispatch(resetChatState({}))
    setTimeout(() => {
      SplashScreen.hide();
      setShowSplashScreen(false);
    }, 200);
  }, []);

  return (
    <></>
  );
};

