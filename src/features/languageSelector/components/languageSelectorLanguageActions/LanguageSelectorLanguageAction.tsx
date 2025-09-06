import AppGradientView from '@/src/components/ui/AppGradientView/AppGradientView'
import AppPressable from '@/src/components/ui/AppPressable/AppPressable'
import AppText from '@/src/components/ui/AppText/AppText'
import { VynceFontStyle } from '@/src/configs/styles/styles'
import { COLORS } from '@/src/constants/colors'
import { ThemeIcons } from '@/src/theme/Icons'
import { screenWidth } from '@/src/utils/resizing'
import { BlurView } from 'expo-blur'
import React, { FC, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { ELangugaes } from '../../models/languageSelector.interface'

interface LanguageSelectorLanguageAction {
    item: { label: string, key: ELangugaes }
    onPress: (v: ELangugaes) => void
    selected: (language: ELangugaes) => boolean
}

const LanguageSelectorLanguageAction: FC<LanguageSelectorLanguageAction> = ({ selected, item, onPress }) => {

    const handleSelectLanguage = useCallback(() => {
        onPress(item.key)
    }, [])

    const isSelected = selected(item.key)

    return (
        <AppPressable onPress={handleSelectLanguage} style={styles.container}>
            <AppGradientView
                colors={["rgba(27, 14, 21, 0.3)", "rgba(45, 18, 43, 0.3)", "rgba(45, 14, 51, 0.3)",]}
                useAngle
                angle={0}
            >
                <LinearGradient
                    colors={["rgba(255,255,255,0.05)", "transparent"]}
                    style={StyleSheet.absoluteFill}
                />
                <BlurView intensity={1} style={[styles.blurView, { borderColor: isSelected ? COLORS.borderColor_807F7F : COLORS.borderColor_3E3E3E }]}>
                    <AppText color={COLORS.white} style={[VynceFontStyle]}>
                        {item.label}
                    </AppText>
                    {isSelected && <ThemeIcons.Common.CheckTick/>}
                </BlurView>
            </AppGradientView>
        </AppPressable>
    )
}

export default LanguageSelectorLanguageAction


const styles = StyleSheet.create({
    container: {
        width: screenWidth - 36,
        overflow: 'hidden',
        borderRadius: 15,
    },
    blurView: {
        overflow: 'hidden',
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: COLORS.borderColor_3E3E3E,
        borderRadius: 15,
        flexDirection:'row', 
        justifyContent:'space-between'
    },
    contentContainerStyle: {
        gap: 8,
        marginTop: 22

    },


})