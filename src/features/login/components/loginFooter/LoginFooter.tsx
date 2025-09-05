import AppText from '@/src/components/ui/AppText/AppText'
import AppView from '@/src/components/ui/AppView/AppView'
import { COLORS } from '@/src/constants/colors'
import { Localizations } from '@/src/locales/localizationTypes'
import React from 'react'
import { useTranslation } from 'react-i18next'

const LoginFooter = () => {
    const {t} = useTranslation()
  return (
    <AppView mt={20}>
       <AppText lineHeight={15} type={'helveticaMedium10px'} color={COLORS.textColor_717171} >
            {t(Localizations.login.by_continuing_you_agree_to_our)}
             <AppText type={'helveticaMedium10px'} color={COLORS.white} >
                 {` ${t(Localizations.login.t_c)} `}
             </AppText>
             {t(Localizations.login.and)}
             <AppText type={'helveticaMedium10px'} color={COLORS.white} >
                 {` ${t(Localizations.login.privacy)}`}
             </AppText>
              {`\n${t(Localizations.login.policy_all_rights_are_reserved_by_Kadam_learning)}`}
       </AppText>
    </AppView>
  )
}

export default (LoginFooter)