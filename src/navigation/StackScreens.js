import ExploreChannels from '../screens/channelsScreen/ExploreChannels';
import ChatScreen from '../screens/chatScreen/ChatScreen';
import IpadScreen from '../screens/ipadScreen/IpadScreen';
import UserProfile from '../screens/userProfiles/UserProfiles';
import ChannelDetailsScreen from '../screens/channelDetails/ChannelDetails';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import SelectWorkSpaceScreen from '../screens/selectWorkSpaceScreen/SelectWorkSpaceScreen';
import { LoginScreenV2 } from '../screens/loginScreen/LoginScreenV2';
import {SelectWorkSpaceScreenV2} from '../screens/selectWorkSpaceScreen/SelectWorkScreenV2'
import { DrawerNavigationV2 } from './DrawerNavigationV2';

export const StackScreens = [
  {
    name: 'Org',
    component: DrawerNavigationV2,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Ipad',
    component: IpadScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Chat',
    component: ChatScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Explore Channels',
    component: ExploreChannels,
  },
  {
    name: 'UserProfiles',
    component: UserProfile,
  },
  {
    name: 'Channel Details',
    component: ChannelDetailsScreen,
  },
];

export const AuthenticationScreens = [
  {
    name: 'Login',
    component: LoginScreenV2,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SelectWorkSpace',
    component: SelectWorkSpaceScreenV2,
    options: {
      headerShown: false,
    },
  },
];
