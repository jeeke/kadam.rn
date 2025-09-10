

import * as React from "react";
import { View } from "react-native";
import { Extrapolation, interpolate, useSharedValue } from "react-native-reanimated";
import Carousel, { Pagination } from "react-native-reanimated-carousel";

const defaultDataWith6Colors = [
    "#B0604D",
    "#899F9C",
    "#B3C680",
    "#5C6265",
    "#F5D399",
    "#F1F1F1",
];

const  WINDOW_WIDTH = screenWidth

// Scale card width based on screen
export const CARD_WIDTH = (WINDOW_WIDTH - 24) / 1.7;

// Maintain aspect ratio (231w : 346h)
const ORIGINAL_WIDTH = 231;
const ORIGINAL_HEIGHT = 346;

export const CARD_HEIGHT = CARD_WIDTH * (ORIGINAL_HEIGHT / ORIGINAL_WIDTH);
export const SPACING = 4

function CarouselNew() {
    const progress = useSharedValue<number>(0);
    return (
        <>
            <AppView mt={-85} mb={-85} >
                <Carousel
                    autoPlayInterval={2000}
                    data={defaultDataWith6Colors}
                    height={CARD_HEIGHT + 200}
                    loop={true}
                    autoPlay
                    pagingEnabled={true}
                    snapEnabled={true}
                    width={screenWidth}
                    style={{
                        width: screenWidth
                    }}
                    mode="parallax"
                    modeConfig={{
                        parallaxScrollingScale: 0.6,
                        parallaxScrollingOffset: 160,
                        parallaxAdjacentItemScale: 0.55,

                    }}
                    
                    onProgressChange={progress}
                    renderItem={renderItem({ rounded: true })}
                />

            </AppView>

            <Pagination.Custom<{ color: string }>
				progress={progress}
				data={defaultDataWith6Colors.map((color) => ({ color }))}
				size={8}
				dotStyle={{
					borderRadius: 16,
					backgroundColor: COLORS.white,
				}}
				activeDotStyle={{
					borderRadius: 4,
					width: 16,
					height: 8,
					overflow: "hidden",
					backgroundColor: "#f1f1f1",
				}}
				containerStyle={{
					gap: 8,
					marginBottom: 10,
					alignItems: "center",
					height: 10,
				}}
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
        </>
    );
}

export default CarouselNew;



import { ImageStyle, StyleProp } from "react-native";
import { CarouselRenderItem } from "react-native-reanimated-carousel";

interface Options {
    rounded?: boolean;
    style?: StyleProp<ImageStyle>;
}

export const renderItem =
    ({ rounded = false, style }: Options = {}): CarouselRenderItem<any> =>
        ({ index, item }: { index: number, item: any }) => (
            <SlideItem item={item} key={index} index={index} rounded={rounded} style={style} />
        );



import { COLORS } from "@/src/constants/colors";
import { screenWidth } from "@/src/utils/resizing";
import {
    ImageSourcePropType,
    StyleSheet,
    Text,
    type ViewProps
} from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import AppView from "../ui/AppView/AppView";


interface Props extends AnimatedProps<ViewProps> {
    style?: StyleProp<ImageStyle>;
    index?: number;
    rounded?: boolean;
    source?: ImageSourcePropType;
    item: any
}

export const SlideItem: React.FC<Props> = (props) => {
    const { style, index = 0, rounded = false, testID, item, ...animatedViewProps } = props;

    //   const source = useMemo(
    //     () => props.source || PURPLE_IMAGES[index % PURPLE_IMAGES.length],
    //     [index, props.source]
    //   );

    return (
        <Animated.View testID={testID} style={{ flex: 1, backgroundColor: item, borderRadius: 20 }} {...animatedViewProps}>
            {/* <Animated.Image
        style={[style, styles.container, rounded && { borderRadius: 15 }]}
        source={Images.common.kadamGradientBG}
        resizeMode="cover"
      /> */}
            <View style={styles.overlay}>
                <View style={styles.overlayTextContainer}>
                    <Text style={styles.overlayText}>{index}</Text>
                </View>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
    overlayText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    overlayTextContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 10,
        minWidth: 40,
        minHeight: 40,
        justifyContent: "center",
        alignItems: "center",
    },
});
