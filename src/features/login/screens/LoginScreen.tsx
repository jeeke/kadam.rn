import AppGradientView from '@/src/components/ui/AppGradientView/AppGradientView'
import AppView from '@/src/components/ui/AppView/AppView'
import { bottomInsets, isAndroid, screenHeight, screenWidth } from '@/src/utils/resizing'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import BannersCarousel from '../components/bannersCarousel/BannersCarousel'
import LoginActions from '../components/loginActions/LoginActions'
import LoginFooter from '../components/loginFooter/LoginFooter'
import LoginHeader from '../components/loginHeader/LoginHeader'

const LoginScreen = () => {
    return (
        <AppGradientView colors={['#49235D', '#0F090E']}  style={[{flex:1}]} >
            <BannersCarousel/>
            <AppGradientView  angle={180} useAngle colors={['rgba(0,0,0,0)', 'rgba(7,5,8,0.7)',  'rgba(3,2,3,0.95)', '#030203', 'rgba(0,0,0,0)',]} style={[styles.secondLayerGradient]} />
            <KeyboardAvoidingView
                style={styles.container}
                behavior={!isAndroid ? 'height' : undefined}
                keyboardVerticalOffset={-16}
            >
                <StatusBar hidden />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <AppView center style={[styles.wrapper]} >
                        <LoginHeader />
                        <LoginActions />
                        <LoginFooter />
                    </AppView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView >
        </AppGradientView>

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
        // backgroundColor: '#250F28'
    }, 
    secondLayerGradient: { 
        height: screenHeight, 
        width: screenWidth, 
        ...StyleSheet.absoluteFillObject
    }

})