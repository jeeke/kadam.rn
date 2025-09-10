import { Images } from '@/src/constants/images'
import { screenHeight, screenWidth } from '@/src/utils/resizing'
import { StatusBar } from 'expo-status-bar'
import React, { FC, ReactNode } from 'react'
import { ImageBackground, StyleSheet, ViewStyle } from 'react-native'

interface IBackgroundWrapper {
  children: ReactNode
  statusBar?: boolean
  style?: ViewStyle | ViewStyle[]
}

const BackgroundWrapper: FC<IBackgroundWrapper> = ({ children, statusBar = true, style }) => {
  return (
    <ImageBackground
      style={[styles.wrapper, StyleSheet.flatten(style)]}
      source={Images.common.kadamScreenBG}
      resizeMode="stretch"
    >
      <StatusBar style={'light'} hidden={!statusBar} />
      {children}
    </ImageBackground>
  )
}

export default BackgroundWrapper

const styles = StyleSheet.create({
  wrapper: {
    width: screenWidth,   // full device width
    height: screenHeight, // full device height, 
  },
})
