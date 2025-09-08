import LanguageSelectorScreen from '@/src/features/languageSelector/screens/LanguageSelectorScreen';
import LoginScreen from '@/src/features/login/screens/LoginScreen';
import MainScreen from '@/src/screens/MainScreen/MainScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useInternetAvailability } from '../../hooks/appConfigs/useInternetAvailability';
import RoughScreen from '../../screens/RoughScreen/RoughScreen';
import SplashScreen from '../../screens/SplashScreen/SplashScreen';
import { RootStackScreens } from './types';


const Stack = createNativeStackNavigator();

export default function RootStack() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const { isConnected, recheckConnection } = useInternetAvailability();

  // if (isLoggedIn === null) return null;
  // if (!isConnected) {
  //   return
  //   // return <NoInternet onRetry={recheckConnection} />;
  // }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RootStackScreens.RoughScreen}>
      <Stack.Screen
        name={RootStackScreens.RoughScreen}
        component={RoughScreen}
      />
      <Stack.Screen
        name={RootStackScreens.MainScreen}
        component={MainScreen}
      />
      <Stack.Screen
        name={RootStackScreens.Login}
        component={LoginScreen}
      />
      <Stack.Screen
        name={RootStackScreens.SplashScreen}
        component={SplashScreen}
      />
      <Stack.Screen
        name={RootStackScreens.LanguageSelectorScreen}
        component={LanguageSelectorScreen}
      />
    </Stack.Navigator>
  );
}
