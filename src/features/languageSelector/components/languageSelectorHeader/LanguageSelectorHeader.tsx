import AppText from '@/src/components/ui/AppText/AppText'
import AppView from '@/src/components/ui/AppView/AppView'
import { VynceFontStyle } from '@/src/configs/styles/styles'
import { COLORS } from '@/src/constants/colors'
import { ThemeIcons } from '@/src/theme/Icons'
import React from 'react'

const LanguageSelectorHeader = () => {
    return (
        <>
            <AppView mt={20} alignSelf={'center'} >
                <ThemeIcons.Common.LanguageSelectorIcon />
            </AppView>
            <AppText mt={24} textAlign='center' color={COLORS.white} style={[VynceFontStyle, { fontSize: 32 }]}>
                {`Language \nSelection`}
            </AppText>
            <AppText mt={14} textAlign='center' color={COLORS.white} type={'helveticaMedium16px'} >
                {'Please select your language'}
            </AppText>
        </>
    )
}

export default LanguageSelectorHeader