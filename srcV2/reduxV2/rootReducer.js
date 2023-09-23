import AsyncStorage from "@react-native-async-storage/async-storage";
import allUsersReducer from './allUsers/allUsersSlice'
import appInfoReducer from './appInfo/appInfoSlice'
import channelsReducer from './channels/channelsSlice'
import chatsReducer from './chats/chatsSlice'
import orgsReducer from './orgs/orgsSlice'
import searchedDataReducer from './searchedData/searchedDataSlice'
import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "redux";
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [
      'userInfoReducer',
      'orgsReducer',
      'channelsReducer',
      'chatReducer',
      'appInfoReducer',
      'searchedUserInfoReducer',
    ],
  };
  
  const rootReducer = combineReducers({
    // USER REDUCER
    // userInfoReducer,
    // orgsReducer,
    // channelsReducer,
    // chatReducer,
    // socketReducer,
    // channelsByQueryReducer,
    // networkReducer,
    // appInfoReducer,
    // searchedUserInfoReducer,
    allUsers : allUsersReducer,
    appInfo : appInfoReducer,
    channels : channelsReducer,
    chats : chatsReducer,
    orgs : orgsReducer,
    searchedData : searchedDataReducer
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  export default persistedReducer;