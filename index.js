/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppSentry from './AppSentry';
import {MMKV} from 'react-native-mmkv';
// import {reduxStorage, storage} from './src/redux/reducers/Index';

if (__DEV__) {
  AppRegistry.registerComponent(appName, () => App);
} else {
  AppRegistry.registerComponent(appName, () => AppSentry);
}
// AsyncStorage.clear();
// storage.clearAll();
