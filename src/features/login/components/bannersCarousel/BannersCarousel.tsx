import { screenWidth, verticalScale } from '@/src/utils/resizing';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    cancelAnimation,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 24)/3.2
const CARD_MARGIN = 8;
const CARD_TOTAL_WIDTH = CARD_WIDTH + CARD_MARGIN * 2;

interface CardItem {
  id: string;
  color: string;
}

interface CarouselRowProps {
  data: CardItem[];
  direction: 'left' | 'right';
  speed: number;
}

// Generate sample data
const generateData = (count: number, colorPalette: string[]): CardItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `card-${i}`,
    color: colorPalette[i % colorPalette.length],
  }));
};

const CarouselRow: React.FC<CarouselRowProps> = ({ data, direction, speed }) => {
  const translateX = useSharedValue(0);
  const extendedData = [...data, ...data, ...data]; // Triple the data for seamless looping

  useEffect(() => {
    // Calculate the total width of the original data set
    const contentWidth = data.length * CARD_TOTAL_WIDTH;
    
    // Set initial position based on direction
    if (direction === 'right') {
      translateX.value = -contentWidth;
    }

    // Start the animation
    translateX.value = withRepeat(
      withTiming(
        direction === 'left' ? -contentWidth : 0,
        { duration: speed, easing: Easing.linear }
      ),
      -1, // infinite repeats
      false // don't reverse
    );

    // Clean up animation on unmount
    return () => {
      cancelAnimation(translateX);
    };
  }, [data.length, direction, speed, translateX]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const renderItem = ({ item, index }: { item: CardItem; index: number }) => {
    return (
      <Animated.View 
        style={[
          styles.card, 
          { 
            backgroundColor: item.color, 
            marginHorizontal: CARD_MARGIN 
          }
        ]} 
      />
    );
  };

  return (
    <View style={styles.rowContainer}>
      <Animated.View style={[styles.animatedContainer, animatedStyle]}>
        {extendedData.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.cardWrapper}>
            {renderItem({ item, index })}
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

const BannersCarousel = () => {
  const colorPalettes = [
    ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F9C80E', '#FD7F20'],
    ['#9370DB', '#00CED1', '#32CD32', '#FFD700', '#FF6347'],
    ['#1E90FF', '#FF69B4', '#7CFC00', '#FF4500', '#DA70D6']
  ];

  const rowData = [
    generateData(5, colorPalettes[0]),
    generateData(5, colorPalettes[1]),
    generateData(5, colorPalettes[2]),
  ];

  return (
    <View style={styles.container}>
      <CarouselRow data={rowData[0]} direction="left" speed={15000} />
      <CarouselRow data={rowData[1]} direction="right" speed={18000} />
      <CarouselRow data={rowData[2]} direction="left" speed={12000} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a1a2e',
    position:'absolute', 
    top:-60, 
    left: 0, 
    width: screenWidth
  },
  rowContainer: {
    height: verticalScale(186),
    overflow: 'hidden',
    marginVertical: 10,
  },
  animatedContainer: {
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
  },
  cardWrapper: {
    flexDirection: 'row',
  },
  card: {
    width: CARD_WIDTH,
    height: verticalScale(186),
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default BannersCarousel;