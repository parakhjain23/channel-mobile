import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {initializeSocket} from '../redux/actions/socket/socketActions';
import AuthNavigation from './AuthNavigation';
import { useCustomSelector } from '../utils/deepCheckSelector';
import { $ReduxCoreType } from '../types/reduxCoreType';
import { SplashScreenComponentV2 } from '../screens/splashScreen/SplashScreenV2';

const StoreAppWrapperV2 = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const {accessToken , currentOrgId} = useCustomSelector((state:$ReduxCoreType)=>({
      accessToken : state?.appInfo?.accessToken ,
      currentOrgId : state?.appInfo?.currentOrgId
    }))
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken) {
      dispatch(
        initializeSocket(accessToken, currentOrgId),
      );
    }
  }, [accessToken, currentOrgId]);

  return showSplashScreen ? (
      <SplashScreenComponentV2 setShowSplashScreen={setShowSplashScreen}/>
  ) : (
    <AuthNavigation />
  );
};
export default StoreAppWrapperV2;