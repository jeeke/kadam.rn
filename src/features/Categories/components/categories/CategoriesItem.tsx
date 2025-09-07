import AppImage from '@/src/components/ui/AppImage/AppImage';
import AppPressable from '@/src/components/ui/AppPressable/AppPressable';
import AppText from '@/src/components/ui/AppText/AppText';
import { COLORS } from '@/src/constants/colors';
import { screenWidth } from '@/src/utils/resizing';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';


export const CARD_WIDTH = (screenWidth - (6 * 2) - 48) / 3; 
export const CARD_HEIGHT = 72;
export const GAP = 6;

interface ICategoriesItem {
    title: string;
    image: string;
}

export const CategoriesItem: FC<{ item: ICategoriesItem }> = ({ item }) => {
    return (
        <AppPressable style={styles.container}>
            <AppText type={'helveticaMedium10px'} color={COLORS.white} >{item.title}</AppText>
            <AppImage source={{ uri: item.image }} style={styles.image} />
        </AppPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        backgroundColor: COLORS.black, 
        borderRadius: 18,
        padding: 12,
        paddingHorizontal:15,
        justifyContent: 'space-between',
        overflow: 'hidden',
        marginHorizontal: GAP / 2,
        marginBottom: GAP,
    },
    image: {
        width: '50%', 
        height: '50%',
        alignSelf: 'flex-end',
    },
});
