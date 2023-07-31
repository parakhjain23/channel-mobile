import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';
import persistReducer from 'redux-persist/es/persistReducer';
import {userInfoReducer} from './user/UserInfo';
import {orgsReducer} from './orgs/GetOrgDetailsReducer';
import {channelsReducer} from './channels/ChannelsReducer';
import {chatReducer} from './chat/ChatReducer';
import {socketReducer} from './socket/SocketReducer';
import {channelsByQueryReducer} from './channels/ChannelsByQueryReducer';
import {networkReducer} from './network/NetworkReducer';
import {appInfoReducer} from './app/AppInfoReducer';
import {searchedUserInfoReducer} from './user/SearchedUserInfo';
import {modalReducer} from './modal/ModalReducer';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const reduxStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};
const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [
    'userInfoReducer',
    'orgsReducer',
    'channelsReducer',
    'chatReducer',
    'appInfoReducer',
    'searchedUserInfoReducer',
    'modalReducer',
  ],
};

const rootReducer = combineReducers({
  // USER REDUCER
  userInfoReducer,
  orgsReducer,
  channelsReducer,
  chatReducer,
  socketReducer,
  channelsByQueryReducer,
  networkReducer,
  appInfoReducer,
  searchedUserInfoReducer,
  modalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
