import AppView from '@/src/components/ui/AppView/AppView'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text } from 'react-native'

const LoginScreen = () => {
  return (
    <AppView>
       <StatusBar hidden />
      <Text>Login Screen</Text>
    </AppView>
  )
}

export default LoginScreen