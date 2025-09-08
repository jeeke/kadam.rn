import { COLORS } from '@/src/constants/colors';
import React, { FC, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import AppImage from '../../ui/AppImage/AppImage';
import AppPressable from '../../ui/AppPressable/AppPressable';
import { CARD_HEIGHT, CARD_WIDTH, SPACING, TCarouselItem } from '../InfiniteCarousel';

interface CarouselItemProps extends TCarouselItem {
    index: number;
    scrollX: Animated.SharedValue<number>;
    onPress?: (item: any, index: number) => void
    item: any
}

export const CarouselItem: FC<CarouselItemProps> = ({ item, onPress, index, scrollX }) => {
    const animatedStyle = useAnimatedStyle(() => {
        // Calculate the position of each item relative to the center
        const inputRange = [
            (index - 1) * CARD_WIDTH,
            index * CARD_WIDTH,
            (index + 1) * CARD_WIDTH,
        ];

        // Interpolate scale
        const scale = interpolate(
            scrollX.value,
            inputRange,
            [0.9, 1, 0.9],
            Extrapolate.CLAMP
        );

        // Interpolate opacity
        const opacity = interpolate(
            scrollX.value,
            inputRange,
            [1, 1, 1],
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }],
            opacity,
        };
    });

    const handlePress = useCallback(() => onPress?.(item, index), [])

    return (
        <AppPressable disabled={!onPress} onPress={handlePress} >
            <Animated.View style={[styles.item, { backgroundColor: item?.color }, animatedStyle]}>
                <AppImage resizeMode={'contain'} source={{ uri: item?.image }} style={[{ height: CARD_HEIGHT, width: CARD_WIDTH }]} />
            </Animated.View>
        </AppPressable>
    );
};

interface PaginationIndicatorProps {
    index: number;
    activeIndex: number;
}

export const PaginationIndicator: FC<PaginationIndicatorProps> = ({ index, activeIndex }) => {
    const isActive = index === activeIndex;

    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(isActive ? 26 : 8, { damping: 10, stiffness: 100 }),
            backgroundColor: withTiming('#fff', { duration: 200 }),
        };
    });

    return <Animated.View style={[styles.indicator, animatedStyle]} />;
};

const styles = StyleSheet.create({
    item: {
        width: CARD_WIDTH - SPACING * 2,
        height: CARD_HEIGHT,
        marginHorizontal: SPACING,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 2, 
        borderColor: COLORS.borderColor_2c2c2c
        
    },
    image: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover',
    },
    textContainer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    description: {
        fontSize: 14,
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    indicator: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
});