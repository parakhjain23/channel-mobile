// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import StoreAppWrapper from './src/navigation/StoreAppWrapper';
import Notifee from '@notifee/react-native';
// import NotificationSetup from './src/utils/NotificationSetup';
// import InternetConnection from './src/utils/InternetConnection';
import SplashScreen from 'react-native-splash-screen';
import { persistor, store } from './srcV2/reduxV2/store';
import { InternetConnectionV2 } from './srcV2/utils/InternetConnectionV2';
import NotificationSetup from './srcV2/utils/NotificationSetup';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    Request();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <InternetConnection />
        <NotificationSetup />
        <StoreAppWrapper /> */}

        <InternetConnectionV2/>
        <NotificationSetup />
      </PersistGate>
    </Provider>
  );
};
export default (App);

async function Request() {
  await Notifee.requestPermission({
    alert: true,
  });
}
