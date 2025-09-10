import AppImage from '@/src/components/ui/AppImage/AppImage';
import AppPressable from '@/src/components/ui/AppPressable/AppPressable';
import AppView from '@/src/components/ui/AppView/AppView';
import { fontStyles } from '@/src/configs/fonts/fontStyles';
import { COLORS } from '@/src/constants/colors';
import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';


const { width: screenWidth } = Dimensions.get('window');

interface CategoryGridItemProps {
    item: {
        id: string;
        title: string;
        imageUrl: string;
    };
    onPress: (item: any, index: number) => void;
    index: number
}

export const CategoryGridItem: React.FC<CategoryGridItemProps> = ({ item, onPress, index }) => {
    const imageWidth = (screenWidth - 100) / 2; // Subtracting 20 for padding on each side, and 20 for gap between items, dividing by 2 for two items
    const imageHeight = (imageWidth * 250) / 168; // Maintain aspect ratio

    return (
        <AppPressable onPress={() => onPress(item, index)}>
            <AppView style={{ position: 'absolute', bottom: 16, left: 12, zIndex: 99 }}>
                <AppView style={{ flex: 1, justifyContent: "center", alignItems: "center", marginLeft: -8, marginBottom: 8, zIndex:2 }}>
                    <StrokeText
                        text={`${index + 1}`}
                        strokeColor={COLORS.borderColor_A7A7A7}
                        strokeWidth={2}
                        {...(fontStyles['helveticaBlack64px'])}
                        color={COLORS.backgroundColor_010101}
                    />

                </AppView>
                <AppView style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <StrokeText
                        text={`${index + 1}`}
                        strokeColor={COLORS.backgroundColor_010101}
                        strokeWidth={2}
                        {...(fontStyles['helveticaBlack64px'])}
                        color={COLORS.backgroundColor_010101}
                    />
                </AppView>
            </AppView>
            <AppImage
                source={{ uri: item.imageUrl }}
                style={[styles.image, { width: imageWidth, height: imageHeight }]}
            />

        </AppPressable>
    );
};

const styles = StyleSheet.create({
    image: {
        borderRadius: 10,
        resizeMode: 'cover',
    },
});
