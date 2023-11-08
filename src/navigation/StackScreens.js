import ExploreChannels from '../screens/channelsScreen/ExploreChannels';
import ChatScreen from '../screens/chatScreen/ChatScreen';
import IpadScreen from '../screens/ipadScreen/IpadScreen';
import UserProfile from '../screens/userProfiles/UserProfiles';
import ChannelDetailsScreen from '../screens/channelDetails/ChannelDetails';
import ChannelDetailsScreenV2 from '../screens/channelDetails/ChannelDetailsV2';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import SelectWorkSpaceScreen from '../screens/selectWorkSpaceScreen/SelectWorkSpaceScreen';
import { LoginScreenV2 } from '../screens/loginScreen/LoginScreenV2';
import {SelectWorkSpaceScreenV2} from '../screens/selectWorkSpaceScreen/SelectWorkScreenV2'
import { DrawerNavigationV2 } from './DrawerNavigationV2';
import { ChatScreenV2 } from '../screens/chatScreen/ChatScreenV2';
import { UserProfileV2 } from '../screens/userProfiles/UserProfileV2';

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
    component: ChatScreenV2,
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
    component: UserProfileV2,
  },
  {
    name: 'Channel Details',
    component: ChannelDetailsScreenV2,
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
