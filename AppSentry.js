import React, {useEffect} from 'react';
import * as Sentry from '@sentry/react-native';
import ErrorBoundary from 'react-native-error-boundary';
import App from './App';
import ErrorScreen from './src/screens/errorScreen/ErrorScreen';
import codePush from 'react-native-code-push';

let CODE_PUSH_OPTIONS = {checkFrequency: codePush.CheckFrequency.MANUAL};
const AppSentry = () => {
  useEffect(() => {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
      // We recommend adjusting this value in production.
      tracesSampleRate: 1.0,
    });
    codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.ON_NEXT_RESTART,
    });
  });

  return <ErrorBoundary FallbackComponent={ErrorScreen} children={<App />} />;
};

export default codePush(CODE_PUSH_OPTIONS)(Sentry.wrap(AppSentry));
