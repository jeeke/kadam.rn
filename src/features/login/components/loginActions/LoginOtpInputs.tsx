import AppTextInput from '@/src/components/kadam/textInputs/KadamTextInput'
import AppRow from '@/src/components/ui/AppRow/AppRow'
import { COLORS } from '@/src/constants/colors'
import { screenWidth } from '@/src/utils/resizing'
import React, { forwardRef } from 'react'
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputKeyPressEventData } from 'react-native'

interface ILoginOtpInputs {
  otp: string[]
  onChangeText: (index: number, text: string) => void
  onKeyPress: (key: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => void
}

const inputWidth = (screenWidth - 42 - 30) / 4

const LoginOtpInputs = forwardRef<TextInput[], ILoginOtpInputs>(({ otp, onChangeText, onKeyPress, }, ref) => {
  const setInputRef = (index: number, element: TextInput | null) => {
    if (ref && typeof ref === 'object' && ref.current) {
      if (element) {
        ref.current[index] = element;
      }
    }
  };

  return (
    <AppRow gap={10} w={screenWidth - 42} >
      {otp.map((value, index) => {
        return <AppTextInput
          value={value}
          ref={(element) => setInputRef(index, element)}
          maxLength={1}
          center
          key={`${index}`}
          inputStyle={[styles.otpInput, { textAlign: 'center', color: COLORS.white }]}
          style={styles.otpInput}
          onChangeText={(text) => onChangeText(index, text)}
          onKeyPress={(key) => onKeyPress(key, index)}
          keyboardType={'numeric'}
        />
      })}
    </AppRow>
  )
})

export default LoginOtpInputs

const styles = StyleSheet.create({
  otpInput: {
    width: inputWidth,
    justifyContent: 'center',
    alignItems: 'center'
  }
})