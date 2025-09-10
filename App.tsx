

import Constants from "expo-constants";
import { Provider as MobxProvider } from 'mobx-react';
import React from 'react';

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheetsWrapper from "./src/components/BottomSheets/BottomSheetsWrapper/BottomSheetsWrapper";
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
            <GestureHandlerRootView>
                <StatusBar backgroundColor={'transparent'} />
                {isDevBuild && <NetworkLoggerWrapper />}
                <NavigationContainer ref={navigationRef}>
                    <BottomSheetModalProvider>
                        <RootStack />
                        <BottomSheetsWrapper />
                    </BottomSheetModalProvider>
                </NavigationContainer>
            </GestureHandlerRootView>
        </MobxProvider>

    );
}

export default App;
