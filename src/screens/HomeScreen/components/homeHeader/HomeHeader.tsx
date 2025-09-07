import PageHeader from '@/src/components/Headers/PageHeader/PageHeader'
import AppPressable from '@/src/components/ui/AppPressable/AppPressable'
import AppRow from '@/src/components/ui/AppRow/AppRow'
import AppText from '@/src/components/ui/AppText/AppText'
import { COLORS } from '@/src/constants/colors'
import { Localizations } from '@/src/locales/localizationTypes'
import { ThemeIcons } from '@/src/theme/Icons'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const HomeHeader = () => {
    const { t } = useTranslation()

    const rightItem = useCallback(() => {
        return <AppRow center gap={6}>
            <AppPressable py={10} px={20} gap={8} center style={[styles.premiumBtn]} >
                <ThemeIcons.Common.PremiumStarIcon />
                <AppText color={COLORS.white} type={'helveticaRegular12px'} >
                    {t(Localizations.common.premium)}
                </AppText>
            </AppPressable>
            <AppPressable>
                <ThemeIcons.Common.LanguageSmallLogo />
            </AppPressable>
        </AppRow>
    }, [])

    return (
        <PageHeader.Spaced style={styles.headerContainer} leftItem={<ThemeIcons.Login.KadamTextLogo />} showRight={true} rightItem={rightItem()} />
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    premiumBtn: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.borderColor_464646
    }, 
    headerContainer:{ width: '100%', paddingHorizontal: 24 }
})