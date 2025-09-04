import AppText from '@/src/components/ui/AppText/AppText'
import AppView from '@/src/components/ui/AppView/AppView'
import { Localizations } from '@/src/locales/localizationTypes'
import React from 'react'
import { useTranslation } from 'react-i18next'

const LoginHeader = () => {
    const { t } = useTranslation()
    return (
        <AppView>
            <AppText textAlign='center' type={'helveticaRegular38px'}>
                {t(Localizations.login.kadam_to_learning)}
            </AppText>
            <AppText textAlign='center' type={'helveticaMedium16px'}>
                {t(Localizations.login.login_or_signup)}
            </AppText>
        </AppView>
    )
}

export default LoginHeader