import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TailwindProvider, useTailwind } from 'tailwind-rn';
import Inicio from './components/Inicio';
import Navegador from './components/Navegador';
import RootNavigator from './Navigation/RootNavigator';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';

import utilities from './tailwind.json';

//SplashScreen.preventAutoHideAsync();
//SplashScreen.hideAsync()

export default function App() {
	const tw = useTailwind();


	const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for four seconds to simulate a slow loading
        await new Promise(resolve => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

	const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


	return (
		<TailwindProvider utilities={utilities}>
			<NavigationContainer>
				<RootNavigator onLayout={onLayoutRootView}/>
				 <StatusBar style='auto' />
			</NavigationContainer>
		</TailwindProvider>
	);
}
