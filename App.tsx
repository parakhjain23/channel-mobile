// import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
// import StoreAppWrapper from './src/navigation/StoreAppWrapper';
// import {persistor, store} from './src/redux/Store';
import Notifee from '@notifee/react-native';
// import NotificationSetup from './src/utils/NotificationSetup';
// import InternetConnection from './src/utils/InternetConnection';
import SplashScreen from 'react-native-splash-screen';
// import { persistor, store } from './srcV2/redux/Store';
import NotificationSetup from './srcV2/utils/NotificationSetup';
// import StoreAppWrapper from './srcV2/navigation/StoreAppWrapper';
import { persistor, store } from './srcV2/reduxV2/store';
// import { InternetConnection } from './srcV2/utils/InternetConnection';
import StoreAppWrapperV2 from './srcV2/navigation/StoreAppWrapperV2';
import { InternetConnectionV2 } from './srcV2/utils/InternetConnectionV2';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    Request();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* <InternetConnection /> */}
        <InternetConnectionV2 />
        <NotificationSetup />
        {/* <StoreAppWrapper /> */}
        <StoreAppWrapperV2 />
      </PersistGate>
    </Provider>
  );
};
export default App;

async function Request() {
  await Notifee.requestPermission({
    alert: true,
  });
}
