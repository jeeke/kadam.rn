import AppImage from '@/src/components/ui/AppImage/AppImage'
import AppView from '@/src/components/ui/AppView/AppView'
import { Images } from '@/src/constants/images'
import { screenHeight, screenWidth } from '@/src/utils/resizing'
import React from 'react'
import { StyleSheet } from 'react-native'

const LanguageSelectorBackground = () => {
    return (
        <AppView style={[styles.imageWrapper]}>
            <AppImage resizeMode={'contain'} aspectRatio={430 / 932} style={[styles.image]} source={Images.common.kadamGradientBG} />
        </AppView>
    )
}

export default LanguageSelectorBackground


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        height: screenHeight,
        width: screenWidth,
    },
    imageWrapper: {
        ...StyleSheet.absoluteFillObject
    }
})