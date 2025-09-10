import PageHeader from '@/src/components/Headers/PageHeader/PageHeader'
import AppPressable from '@/src/components/ui/AppPressable/AppPressable'
import AppRow from '@/src/components/ui/AppRow/AppRow'
import AppText from '@/src/components/ui/AppText/AppText'
import { COLORS } from '@/src/constants/colors'
import withRootStore from '@/src/HOCs/withRootStore'
import { Localizations } from '@/src/locales/localizationTypes'
import { PropsWithStore } from '@/src/mobxStore/RootStore'
import { EBottomSheet } from '@/src/models/bottomSheet/bottomSheet.interface'
import { ThemeIcons } from '@/src/theme/Icons'
import React, { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const HomeHeader: FC<PropsWithStore<{}>> = ({ rootStore }) => {
    const { bottomSheetStore, authStore } = rootStore!
    const { t } = useTranslation()

    const rightItem = useCallback(() => {
        return <AppRow center gap={6}>
            <AppPressable py={10} px={20} gap={8} center style={[styles.premiumBtn]} >
                <ThemeIcons.Common.PremiumStarIcon />
                <AppText color={COLORS.white} type={'helveticaRegular12px'} >
                    {t(Localizations.common.premium)}
                </AppText>
            </AppPressable>
            <AppPressable onPress={() => { bottomSheetStore.openBottomSheet(EBottomSheet.LANGUAGE_SELECTOR) }} >
                <ThemeIcons.Common.LanguageSmallLogo />
            </AppPressable>
        </AppRow>
    }, [])

    return (
        <PageHeader.Spaced style={styles.headerContainer} leftItem={<AppPressable onPress={()=>{authStore.logout()}}>
            <ThemeIcons.Login.KadamTextLogo />
        </AppPressable>} showRight={true} rightItem={rightItem()} />
    )
}

export default withRootStore(HomeHeader)

const styles = StyleSheet.create({
    premiumBtn: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.borderColor_464646
    },
    headerContainer: { width: '100%', paddingHorizontal: 24 }
})