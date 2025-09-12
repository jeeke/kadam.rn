

import { screenWidth } from "@/src/utils/resizing";
import * as React from "react";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import AppView from "../ui/AppView/AppView";
import { renderItem } from "./components/CarouselItem";
import CarouselPaginationIndicator from "./components/CarouselPaginationIndicator";

export const defaultDataWith6Colors = [
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

function InfinteCarousel() {
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
            <CarouselPaginationIndicator progress={progress} />          
        </>
    );
}

export default InfinteCarousel;


