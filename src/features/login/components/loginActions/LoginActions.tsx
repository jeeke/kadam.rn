import KadamButton from '@/src/components/kadam/buttons/KadamButton'
import AppTextInput from '@/src/components/kadam/textInputs/KadamTextInput'
import AppRow from '@/src/components/ui/AppRow/AppRow'
import AppText from '@/src/components/ui/AppText/AppText'
import AppView from '@/src/components/ui/AppView/AppView'
import { COLORS } from '@/src/constants/colors'
import withRootStore from '@/src/HOCs/withRootStore'
import { Localizations } from '@/src/locales/localizationTypes'
import { PropsWithStore } from '@/src/mobxStore/RootStore'
import { ThemeIcons } from '@/src/theme/Icons'
import { screenWidth } from '@/src/utils/resizing'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'
import { useLoginActions } from '../../hooks/useLoginActions'
import LoginOtpInputs from './LoginOtpInputs'

const LoginActions: FC<PropsWithStore<{}>> = ({ rootStore }) => {
    const {
        t,
        otp,
        inputRefs,
        handleContinue,
        handleMobileNumber, 
        loginStore,
        onKeyPress,
        onChangeText
    } = useLoginActions({ rootStore: rootStore! })

    return (
        <AppView gap={8}>
            {!loginStore.isOtpFetched ? <AppTextInput keyboardType={'numeric'} maxLength={10} onChangeText={handleMobileNumber} leftChildren={<CountryCode />} placeholder={'1234567890'} value={loginStore.mobileNumber} />
                : <LoginOtpInputs
                    ref={inputRefs}
                    otp={otp}
                    onChangeText={onChangeText}
                    onKeyPress={onKeyPress}
                />}
            <KadamButton.Primary onPress={handleContinue} disabled={loginStore.isLoading} loader={loginStore.isLoading} w={screenWidth - 42} text={t(Localizations.login.continue)} />
        </AppView>
    )
}

export default withRootStore(LoginActions)

const CountryCode = () => {
    return <AppRow gap={10} mr={12} pr={12} style={[styles.countryCode]}>
        <ThemeIcons.Login.IndiaLogo />
        <AppText color={COLORS.white} type={'helveticaRegular16px'} >
            +91
        </AppText>
    </AppRow>
}

const styles = StyleSheet.create({
    countryCode: {
        borderRightWidth: 1,
        borderRightColor: COLORS.textColor_8E8E8E
    }
})