import AppView from '@/src/components/ui/AppView/AppView'
import { bottomInsets, isAndroid, screenWidth } from '@/src/utils/resizing'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import LoginActions from '../components/loginActions/LoginActions'
import LoginFooter from '../components/loginFooter/LoginFooter'
import LoginHeader from '../components/loginHeader/LoginHeader'

const LoginScreen = () => {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={!isAndroid ? 'height' : undefined}
            keyboardVerticalOffset={-16}
        >
            <StatusBar hidden />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                {/* <View /> */}
                <AppView center style={[styles.wrapper]} >
                    <LoginHeader />
                    <LoginActions />
                    <LoginFooter/>
                </AppView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >

    )
}

export default LoginScreen

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        bottom: bottomInsets,
        width: screenWidth,
        paddingHorizontal: 42,
        gap: 22,

    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#250F28'
    }
})