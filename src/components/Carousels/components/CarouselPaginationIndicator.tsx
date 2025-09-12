import { COLORS } from '@/src/constants/colors';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Extrapolation, interpolate, SharedValue } from 'react-native-reanimated';
import { Pagination } from 'react-native-reanimated-carousel';
import { defaultDataWith6Colors } from '../InfiniteCarousel';

const CarouselPaginationIndicator:FC<{progress: SharedValue<number>}> = ({progress}) => {
  return (
    <Pagination.Custom<{ color: string }>
    progress={progress}
    data={defaultDataWith6Colors.map((color) => ({ color }))}
    size={8}
    dotStyle={styles.dotStyle}
    activeDotStyle={styles.activeDotStyle}
    containerStyle={styles.containerStyle}
    horizontal
    customReanimatedStyle={(progress, index, length) => {
        let val = Math.abs(progress - index);
        if (index === 0 && progress > length - 1) {
            val = Math.abs(progress - length);
        }
        return {
            transform: [
                {
                    translateY: interpolate(
                        val,
                        [0, 1],
                        [0, 0],
                        Extrapolation.CLAMP,
                    ),
                },
            ],
        };
    }}
/>
  )
}

export default CarouselPaginationIndicator

const styles = StyleSheet.create({
    dotStyle:{
        borderRadius: 16,
        backgroundColor: COLORS.white,
    },
    activeDotStyle:{
        borderRadius: 4,
        width: 16,
        height: 8,
        overflow: "hidden",
        backgroundColor: "#f1f1f1",
    },
    containerStyle:{
        gap: 8,
        marginBottom: 10,
        alignItems: "center",
        height: 10,
    }

})