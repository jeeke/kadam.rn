import AppGradientView from '@/src/components/ui/AppGradientView/AppGradientView'
import withRootStore from '@/src/HOCs/withRootStore'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet } from 'react-native'
import LanguageSelectorBackground from '../components/languageSelectorBackground/LanguageSelectorBackground'
import LanguageSelectorLanguageActions from '../components/languageSelectorLanguageActions/LanguageSelectorLanguageActions'

const LanguageSelectorScreen = () => {
    return (
        <AppGradientView style={styles.container} colors={['#49235D', '#0F090E']}>
            <StatusBar hidden />
            <LanguageSelectorBackground />
            <LanguageSelectorLanguageActions />
        </AppGradientView>
    )
}

export default withRootStore(LanguageSelectorScreen)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})