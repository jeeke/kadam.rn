import AppRow from '@/src/components/ui/AppRow/AppRow'
import AppText from '@/src/components/ui/AppText/AppText'
import { VynceFontStyle } from '@/src/configs/styles/styles'
import { COLORS } from '@/src/constants/colors'
import { Localizations } from '@/src/locales/localizationTypes'
import { ThemeIcons } from '@/src/theme/Icons'
import React from 'react'
import { useTranslation } from 'react-i18next'

const LanguageSelectorHeaderBottomSheet = () => {
    const { t } = useTranslation()
    return (
        <AppRow justifyContent={'space-between'} mt={36} px={30}>
            <AppText color={COLORS.white} style={[VynceFontStyle, { fontSize: 24 }]}>
                {t(Localizations.language.select_language)}
            </AppText>
            <ThemeIcons.Common.LanguageSmallLogo />
        </AppRow>
    )
}

export default LanguageSelectorHeaderBottomSheet