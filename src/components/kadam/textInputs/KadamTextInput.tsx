import { COLORS } from '@/src/constants/colors';
import { isAndroid, screenWidth, verticalScale } from '@/src/utils/resizing';
import React, { ReactNode } from 'react';
import { StyleSheet, TextInput, TextInputProps, TextStyle } from 'react-native';
import AppRow, { AppRowProps } from '../../ui/AppRow/AppRow';

export interface AppTextInputProps
    extends Omit<TextInputProps, 'style'>,
    Omit<AppRowProps, 'children'> {
    inputStyle?: TextStyle | TextStyle[];
    leftChildren?: ReactNode
}

const AppTextInput: React.FC<AppTextInputProps> = ({
    inputStyle,
    style,
    leftChildren,
    ...rest
}) => {
    return (
        <AppRow  style={[styles.wrapper, StyleSheet.flatten(style)]}>
            {leftChildren && leftChildren}
            <TextInput
                style={[styles.inputTextStyle, inputStyle]}
                cursorColor={ rest?.cursorColor ?? COLORS.white}
                selectionColor={ rest?.selectionColor ??COLORS.white}
                placeholderTextColor={ rest?.placeholderTextColor ?? COLORS.textColor_8E8E8E}
                {...rest}
            />
        </AppRow>
    );
};

export default AppTextInput;

const styles = StyleSheet.create({
    wrapper: {
       width: (screenWidth-42) , 
       backgroundColor: COLORS.black, 
       paddingHorizontal: 21, 
       paddingVertical: verticalScale(isAndroid ? 18: 24), 
       borderRadius: 20, 
       borderWidth:1, 
       borderColor: COLORS.borderColor_2c2c2c, 
       alignItems:'center'
    },
    inputTextStyle: {
        fontFamily: 'HelveticaNowDisplay-Regular',
        color: COLORS.white,
        fontSize: 16,
        width: (screenWidth -42) * 0.65 
    }
})
