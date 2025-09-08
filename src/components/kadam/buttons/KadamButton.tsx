import { FontStylesType } from '@/src/configs/fonts/fontStyles';
import { VynceFontStyle } from '@/src/configs/styles/styles';
import { COLORS } from '@/src/constants/colors';
import React, { FC } from 'react';
import { ActivityIndicator, DimensionValue, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import AppPressable, { AppPressableProps } from '../../ui/AppPressable/AppPressable';
import AppText from '../../ui/AppText/AppText';

interface KadamButtonProps extends AppPressableProps {
  text?: string,
  textType?: FontStylesType,
  textColor?: string
  w?: DimensionValue
  h?: DimensionValue
  textStyle?: TextStyle | TextStyle[]
  style?: ViewStyle | ViewStyle[]
  disabled?: boolean
  loader?: boolean
}

const BaseButton: React.FC<KadamButtonProps> = ({
  children,
  text,
  textType = "helveticaBold12px",
  textColor,
  w = 'auto',
  h,
  textStyle,
  style,
  disabled,
  loader,
  ...rest
}) => {
  const styling: ViewStyle = { width: w, height: h }
  return (
    <AppPressable
      disabled={disabled}
      style={[StyleSheet.flatten(style), styling]}
      {...rest}
    >
      <>
        {loader ? <ActivityIndicator size={24} color={COLORS.white}  /> :
          <>
            {children ? <>
              {children}
            </> : <AppText type={textType} color={textColor} style={[StyleSheet.flatten(textStyle)]} >
              {text}
            </AppText>}
          </>
        }
      </>
    </AppPressable>
  );
};


const Primary: FC<KadamButtonProps> = (props) => {
  return <BaseButton {...props} textStyle={[styles.primaryTextStyle]} style={[styles.primary, StyleSheet.flatten(props?.style)]} />
}

const Secondary: FC<KadamButtonProps> = (props) => {
  return <BaseButton {...props} style={[styles.secondary]} />
}

const KadamButton = {
  Primary: (props: KadamButtonProps) => (
    <Primary {...props} textColor={props?.textColor || '#fff'} />
  ),
  Secondary: (props: KadamButtonProps) => (
    <Secondary {...props} textColor={props?.textColor || '#5F34F6'} style={[styles.secondary, StyleSheet.flatten(props?.style)]} />
  ),
};

const styles = StyleSheet.create({
  primary: {
    backgroundColor: COLORS.backgroundButton, // Primary color
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
    borderWidth: 1,
    borderColor: COLORS.borderColor_3E3E3E
  },
  secondary: {
    backgroundColor: '#fff', // Secondary color
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5DFFC',
  },
  primaryTextStyle: {
    ...VynceFontStyle,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default KadamButton;