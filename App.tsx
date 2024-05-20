/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/utils/theme';
import Navigation from './src/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppState, Platform, StatusBar} from 'react-native';
import {SWRConfig} from 'swr';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      if (Platform.OS === 'android') {
        SplashScreen.hide();
      }
    }, 3000);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar translucent={false} />
        <SWRConfig
          value={{
            provider: () => new Map(),
            isVisible: () => {
              return true;
            },
            initFocus(callback) {
              let appState = AppState.currentState;

              const onAppStateChange = (nextAppState: any) => {
                /* If it's resuming from background or inactive mode to active one */
                if (
                  appState.match(/inactive|background/) &&
                  nextAppState === 'active'
                ) {
                  callback();
                }
                appState = nextAppState;
              };

              // Subscribe to the app state change events
              const subscription = AppState.addEventListener(
                'change',
                onAppStateChange,
              );

              return () => {
                subscription.remove();
              };
            },
          }}>
          <Navigation />
        </SWRConfig>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
