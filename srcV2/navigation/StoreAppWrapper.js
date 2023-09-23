import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initializeSocket} from '../redux/actions/socket/socketActions';
import SplashScreenComponent from '../screens/splashScreen/SplashScreen';
import AuthNavigation from './AuthNavigation';

const StoreAppWrapper = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const userInfoState = useSelector(state => state.userInfoReducer);
  const orgsState = useSelector(state => state.orgsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfoState?.accessToken) {
      dispatch(
        initializeSocket(userInfoState?.accessToken, orgsState?.currentOrgId),
      );
    }
  }, [userInfoState?.accessToken, orgsState?.currentOrgId]);

  return showSplashScreen ? (
    <SplashScreenComponent setShowSplashScreen={setShowSplashScreen} />
  ) : (
    <AuthNavigation />
  );
};
export default StoreAppWrapper;
