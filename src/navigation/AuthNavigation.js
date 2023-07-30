import React, {useEffect, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ProtectedNavigation from './ProtectedNavigation';
import {navigationRef} from './RootNavigation';
import {useColorScheme} from 'react-native';
import {DARK_THEME, LIGHT_THEME} from '../theme/Theme';
import ModalComponent from '../components/ModalComponent';
import {useDispatch} from 'react-redux';

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
  const modalizeRef = useRef(null);
  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linking}
      theme={scheme === 'light' ? LIGHT_THEME : DARK_THEME}>
      <ProtectedNavigation />
      <ModalComponent modalizeRef={modalizeRef} />
    </NavigationContainer>
  );
};

export default AuthNavigation;
