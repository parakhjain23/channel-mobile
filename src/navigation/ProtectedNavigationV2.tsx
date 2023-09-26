import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { connect, useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { Platform, Dimensions } from 'react-native';
import { DEVICE_TYPES } from '../constants/Constants';
import * as Actions from '../redux/Enums';
import { AuthenticationScreens, StackScreens } from './StackScreens';
import useCustomSelector from '../utils/deepCheckSelector';
import { $ReduxCoreType } from '../types/reduxCoreType';
import { updateAppInfoState } from '../reduxV2/appInfo/appInfoSlice';

export const ProtectedNavigationV2 = () => {
  const Stack = createNativeStackNavigator();
  const { colors } = useTheme();
  const { width, height } = Dimensions.get('window');
  const isTablet = width >= 600 && height >= 600;
  const isIPad = Platform.OS === 'ios' && Platform.isPad;
  const deviceType = isTablet || isIPad ? DEVICE_TYPES[1] : DEVICE_TYPES[0];
  const currentOrgId = useCustomSelector((state: $ReduxCoreType) => state?.orgs?.currentOrgId)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateAppInfoState({ deviceType: deviceType }))
  }, []);

  const getHeader = {
    headerTintColor: colors.textColor,
    animation: 'none',
    headerStyle: {
      color: colors.textColor,
      backgroundColor: colors.headerColor,
    },
    statusBarColor: 'transparent',
    statusBarTranslucent: true,
    statusBarStyle: colors?.primaryColor === '#ffffff' ? 'dark' : 'light',
  };

  const customScreenOptions = ({ route }) => {
    const options = {
      headerShown: true,
      headerTitle: ''
    };

    switch (route.name) {
      case 'Explore Channels':
        options.headerTitle = route.name;
        break;
      case 'UserProfiles':
        options.headerTitle = route.params?.displayName
          ? route.params.displayName
          : 'User Profile';
        break;
      case 'Channel Details':
        options.headerTitle = route.params?.channelName || 'Channel Details';
        break;
      default:
        break;
    }

    return options;
  };

  return currentOrgId == null ? (
    <Stack.Navigator>
      {AuthenticationScreens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={screen.options}
        />
      ))}
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={customScreenOptions}>
      {StackScreens.map(({ name, component, options }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={component}
          options={{ ...options, ...getHeader }}
        />
      ))}
    </Stack.Navigator>
  );
};
