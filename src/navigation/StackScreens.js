import ExploreChannels from '../screens/channelsScreen/ExploreChannels';
import ChatScreen from '../screens/chatScreen/ChatScreen';
import IpadScreen from '../screens/ipadScreen/IpadScreen';
import DrawerNavigation from './DrawerNavigation';
import UserProfile from '../screens/userProfiles/UserProfiles';
import ChannelDetailsScreen from '../screens/channelDetails/ChannelDetails';
import LoginScreen from '../screens/loginScreen/LoginScreen';
import SelectWorkSpaceScreen from '../screens/selectWorkSpaceScreen/SelectWorkSpaceScreen';

export const StackScreens = [
  {
    name: 'Org',
    component: DrawerNavigation,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Ipad',
    component: IpadScreen,
    options: {
      headerShown: true,
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
    options: ({route}) => ({
      headerTitle: route?.params?.chatHeaderTitle,
      headerShown: true,
    }),
  },
  {
    name: 'UserProfiles',
    component: UserProfile,
    options: ({route}) => ({
      headerTitle: route?.params?.displayName + ' Profile',
      headerShown: true,
    }),
  },
  {
    name: 'Channel Details',
    component: ChannelDetailsScreen,
    options: ({route}) => ({
      headerTitle: route?.params?.channelName,
      headerShown: true,
    }),
  },
];

export const AuthenticationScreens = [
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'SelectWorkSpace',
    component: SelectWorkSpaceScreen,
    options: {
      headerShown: false,
    },
  },
];
