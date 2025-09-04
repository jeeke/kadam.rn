import AppView from '@/src/components/ui/AppView/AppView'
import { bottomInsets, screenWidth } from '@/src/utils/resizing'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
import LoginHeader from '../components/loginHeader/LoginHeader'

const LoginScreen = () => {
    return (
        <AppView style={[styles.container]} >
            <StatusBar hidden />
            <AppView center style={[styles.wrapper]} >
                <LoginHeader />
            </AppView>
        </AppView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: bottomInsets,
        width: screenWidth, 
    },
    container: {
        flex: 1
    }
})