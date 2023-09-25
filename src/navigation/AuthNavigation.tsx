import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ProtectedNavigation from './ProtectedNavigation';
import {navigationRef} from './RootNavigation';
import {useColorScheme} from 'react-native';
import {DARK_THEME, LIGHT_THEME} from '../theme/Theme';
import { ProtectedNavigationV2 } from './ProtectedNavigationV2';

const linking = {
  prefixes: ['channel://', 'channel', 'walkover.space.chat'],
  initialRouteName: 'Login',
  config: {
    screens: {
      Login: {
        path: 'login',
      },
      Hello: {
        path: 'hello',
      },
      // Login: "*"
    },
  },
};
const AuthNavigation = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={scheme === 'light' ? LIGHT_THEME : DARK_THEME}>
      <ProtectedNavigationV2 />
    </NavigationContainer>
  );
};

export default AuthNavigation;
