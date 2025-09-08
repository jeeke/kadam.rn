

import Constants from "expo-constants";
import { Provider as MobxProvider } from 'mobx-react';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { NetworkLoggerWrapper } from "./src/components/tools/Network/NetworkLoggerWrapper";
import { useApp } from './src/hooks/appConfigs/useApp';
import RootStack from './src/navigation/RootStack/RootStack';
import { navigationRef } from './src/utils/NavigationUtils';


function App(): React.JSX.Element {
    const { rootStore, loaded, error } = useApp()

    if (!loaded && !error) {
        return <></>;
    }

    const isDevBuild = Constants.expoConfig?.extra?.environment === 'development'

    return (
        <MobxProvider rootStore={rootStore} {...rootStore}>
            <StatusBar backgroundColor={'transparent'} />
            {isDevBuild && <NetworkLoggerWrapper />}
            <NavigationContainer ref={navigationRef}>
                <RootStack />
            </NavigationContainer>
        </MobxProvider>
    );
}

export default App;
