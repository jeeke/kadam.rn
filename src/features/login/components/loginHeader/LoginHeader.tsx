import AppText from '@/src/components/ui/AppText/AppText'
import AppView from '@/src/components/ui/AppView/AppView'
import withRootStore from '@/src/HOCs/withRootStore'
import { Localizations } from '@/src/locales/localizationTypes'
import { PropsWithStore } from '@/src/mobxStore/RootStore'
import { ThemeIcons } from '@/src/theme/Icons'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

const LoginHeader:FC<PropsWithStore<{}>> = () => {
    const { t } = useTranslation()
    return (
        <AppView>
            <AppText textAlign='center' type={'helveticaRegular38px'}>
                {t(Localizations.login.kadam_to_learning)}
            </AppText>
            <AppText textAlign='center' type={'helveticaMedium16px'}>
                {t(Localizations.login.login_or_signup)}
            </AppText>
            <ThemeIcons.ArrowRightUpBlack/>
        </AppView>
    )
}

export default withRootStore(LoginHeader)