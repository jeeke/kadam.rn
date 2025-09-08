import AppText from '@/src/components/ui/AppText/AppText';
import { FontStylesType } from '@/src/configs/fonts/fontStyles';
import { COLORS } from '@/src/constants/colors';
import React, { FC } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import AppRow, { AppRowProps } from '../../ui/AppRow/AppRow';

interface SectionHeaderProps extends Omit<AppRowProps, 'children'> {
    title: string;
    style?: ViewStyle | ViewStyle[];
    type?: FontStylesType
    textStyle?: TextStyle | TextStyle[]
    color?: string
}

export const SectionHeader: FC<SectionHeaderProps> = ({ color= COLORS.white, title, style, type = 'helveticaMedium14px', textStyle, ...rest }) => {
    return (
        <AppRow {...rest} style={[styles.container, StyleSheet.flatten(style)]}>
            <AppText color={color} style={[StyleSheet.flatten(textStyle)]} type={type}>{title}</AppText>
        </AppRow>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 8
    },
});