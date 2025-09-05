import AppText from '@/src/components/ui/AppText/AppText'
import AppView from '@/src/components/ui/AppView/AppView'
import { COLORS } from '@/src/constants/colors'
import withRootStore from '@/src/HOCs/withRootStore'
import { Localizations } from '@/src/locales/localizationTypes'
import { PropsWithStore } from '@/src/mobxStore/RootStore'
import { ThemeIcons } from '@/src/theme/Icons'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

const LoginHeader: FC<PropsWithStore<{}>> = () => {
    const { t } = useTranslation()
    return (
        <AppView gap={0} center>
            <ThemeIcons.Login.KadamTextLogo />
            <AppText color={COLORS.textLight} mt={-8} textAlign='center' type={'helveticaRegular38px'}>
                {t(Localizations.login.kadam_to_learning)}
            </AppText>
            <AppText mt={8} color={COLORS.textLight} textAlign='center' type={'helveticaMedium16px'}>
                {t(Localizations.login.login_or_signup)}
            </AppText>
        </AppView>
    )
}

export default withRootStore(LoginHeader)