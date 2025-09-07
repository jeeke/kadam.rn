import AppTextInput from '@/src/components/kadam/textInputs/KadamTextInput'
import { COLORS } from '@/src/constants/colors'
import { ThemeIcons } from '@/src/theme/Icons'
import React from 'react'
import { StyleSheet } from 'react-native'

const HomeSearch = () => {
    return (

        <AppTextInput gap={16} leftChildren={<ThemeIcons.Common.SearchIcon />} style={[styles.textInput]} />

    )
}

export default HomeSearch

const styles = StyleSheet.create({
    textInput: {
        borderColor: COLORS.borderColor_464646,
        height: 64,
        paddingVertical: 0,
        alignItems: 'center'
    }
})