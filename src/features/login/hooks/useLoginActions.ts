import { RootStoreType } from "@/src/mobxStore/RootStore"
import { useCallback, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { TextInput } from "react-native"

export const useLoginActions = ({ rootStore }: { rootStore: RootStoreType }) => {
    const { loginStore } = rootStore!
    const { t } = useTranslation()
    const [otp, setOtp] = useState(new Array(4).fill(""));
    const inputRefs = useRef<TextInput[]>(new Array(4).fill(null));

    const onChangeText = (index: number, value: string) => {
        // If user clears the input (deletes), move focus back
        if (value === "") {
            const newOtp = [...otp];
            newOtp[index] = "";
            setOtp(newOtp);
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
            return;
        }

        // Otherwise, set value and move to next
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        if (value && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.join("").length === 4) {
            loginStore.callVerifyOtp(newOtp.join(""));
        }
    };

    const onKeyPress = useCallback((key: { nativeEvent: { key: string } }, index: number) => {
        if (key.nativeEvent.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1]?.focus()   
        }
    }, [otp])

    const handleContinue = useCallback(() => {
        if (loginStore.isOtpFetched) {
            loginStore.callVerifyOtp(otp.join(""))
        } else {
            loginStore.callSendOtp()
        }
    }, [loginStore.isOtpFetched])

    const handleMobileNumber = useCallback((text: string) => {
        const formattedText = text.replace(/[^0-9]/g, '');
        loginStore.setMobileNumber(formattedText)
    }, [loginStore.isOtpFetched])

    return {
        t, 
        onChangeText,
        onKeyPress,
        handleContinue,
        loginStore,
        inputRefs, 
        otp, 
        handleMobileNumber
    }

}