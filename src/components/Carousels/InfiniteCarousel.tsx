import React, { FC, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
    ViewStyle
} from 'react-native';
import Animated, {
    useSharedValue
} from 'react-native-reanimated';
import AppView, { AppViewProps } from '../ui/AppView/AppView';
import { CarouselItem, PaginationIndicator } from './components/CarouselItem';

const { width: WINDOW_WIDTH } = Dimensions.get('window');

// Scale card width based on screen
export const CARD_WIDTH = (WINDOW_WIDTH - 24) / 1.7;

// Maintain aspect ratio (231w : 346h)
const ORIGINAL_WIDTH = 231;
const ORIGINAL_HEIGHT = 346;

export const CARD_HEIGHT = CARD_WIDTH * (ORIGINAL_HEIGHT / ORIGINAL_WIDTH);
export const SPACING = 4
export type TCarouselItem =  {
    id: number;
    title: string;
    description: string;
    color: string;
    image: string;
}

const carouselData = [
    {
        id: 1,
        title: 'Slide 1',
        description: 'This is the first slide',
        color: '#FF6B6B',
        image: 'https://picsum.photos/300/200?random=1'
    },
    {
        id: 2,
        title: 'Slide 2',
        description: 'This is the second slide',
        color: '#4ECDC4',
        image: 'https://picsum.photos/300/200?random=2'
    },
    {
        id: 3,
        title: 'Slide 3',
        description: 'This is the third slide',
        color: '#45B7D1',
        image: 'https://picsum.photos/300/200?random=3'
    },
    {
        id: 4,
        title: 'Slide 4',
        description: 'This is the fourth slide',
        color: '#F7DC6F',
        image: 'https://picsum.photos/300/200?random=4'
    }
];

interface IInfiniteCarousel extends AppViewProps {
    style?: ViewStyle | ViewStyle[]
}

const InfiniteCarousel: FC<IInfiniteCarousel> = ({ style, ...rest }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const scrollViewRef = useRef<Animated.ScrollView>(null);
    const [isScrolling, setIsScrolling] = useState(false);
    const infiniteData = [carouselData[carouselData.length - 1], ...carouselData, carouselData[0]];
    const scrollX = useSharedValue(0);

    function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
        const offset = e.nativeEvent.contentOffset.x;
        scrollX.value = offset;
        const index = Math.round(offset / (CARD_WIDTH + SPACING * 2));
        setCurrentIndex(index);
    }

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: (CARD_WIDTH + SPACING * 2),
                animated: false,
            });
        }
    }, []);

    useEffect(() => {
        let timer: ReturnType<typeof setInterval>;
        timer = setInterval(() => {
            if (!isScrolling) {
                handleAutoScroll();
            }
        }, 3000);

        return () => clearInterval(timer);
    }, [currentIndex, isScrolling]);

    function handleAutoScroll() {
        if (scrollViewRef.current) {
            const nextIndex = currentIndex + 1;
            scrollViewRef.current?.scrollTo({
                x: nextIndex * CARD_WIDTH,
                animated: true
            });
        }
    }

    function handleOnScrollBeginDrag() {
        setIsScrolling(true);
    }

    function handleOnScrollEndDrag() {
        setIsScrolling(false);
    }

    function handleMomentumScrollEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
        const offset = e.nativeEvent.contentOffset.x;
        const index = Math.round(offset / (CARD_WIDTH + SPACING * 2));

        if (index === 0) {
            scrollViewRef.current?.scrollTo({
                x: carouselData.length * (CARD_WIDTH + SPACING * 2),
                animated: false
            });
            setCurrentIndex(carouselData.length);
        } else if (index === infiniteData.length - 1) {
            scrollViewRef.current?.scrollTo({
                x: (CARD_WIDTH + SPACING * 2),
                animated: false
            });
            setCurrentIndex(1);
        }
    }

    const getActiveIndex = () => {
        if (currentIndex === 0) return carouselData.length - 1;
        else if (currentIndex === infiniteData.length - 1) return 0;
        return currentIndex - 1;
    };

    return (
        <AppView {...rest} style={[styles.container, StyleSheet.flatten(style)]}>
            <Animated.ScrollView
                onScrollEndDrag={handleOnScrollEndDrag}
                onScrollBeginDrag={handleOnScrollBeginDrag}
                scrollEventThrottle={16}
                ref={scrollViewRef}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                horizontal
                snapToInterval={CARD_WIDTH + SPACING * 2}
                decelerationRate={'fast'}
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
            >
                {infiniteData.map((item: TCarouselItem, index) => (
                    <CarouselItem
                        key={`${item.id}-${index}`}
                        {...item}
                        index={index}
                        scrollX={scrollX}
                        onPress={(item, index)=>{
                            console.log("ina", item)
                        }}

                    />
                ))}
            </Animated.ScrollView>

            <View style={styles.indicatorContainer}>
                {carouselData.map((item, index) => (
                    <PaginationIndicator
                        key={`${index}`}
                        index={index}
                        activeIndex={getActiveIndex()}
                    />
                ))}
            </View>
        </AppView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        height: CARD_HEIGHT + 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        paddingHorizontal: (WINDOW_WIDTH - CARD_WIDTH) / 2,
    },
    item: {
        width: CARD_WIDTH - SPACING * 2,
        height: CARD_HEIGHT,
        marginHorizontal: SPACING,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
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
        height: 10,
        borderRadius: 5,
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    }
});

export default InfiniteCarousel;