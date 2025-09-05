import Constants from "expo-constants";
import { Dimensions, PixelRatio, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;

// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;

const widthPercentageToDP = (widthPercent: string | number) => {
  // Parse string percentage input and convert it to number.
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent: string | number) => {
  // Parse string percentage input and convert it to number.
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const BASE_WIDTH = 430;
const BASE_HEIGHT = 932;

/**
 * Scale size horizontally based on device width
 */
export const scale = (size: number) => (screenWidth / BASE_WIDTH) * size;

/**
 * Scale size vertically based on device height
 */
export const verticalScale = (size: number) =>
  (screenHeight / BASE_HEIGHT) * size;

/**
 * Moderate scale (more natural scaling, not too aggressive)
 * factor = 0.5 means 50% scaling adjustment
 */
export const moderateScale = (size: number, factor: number = 0.5) =>
  size + (scale(size) - size) * factor;

export {
  heightPercentageToDP, screenHeight, screenWidth, widthPercentageToDP
};

// Get the status bar height (from Constants)
export const { statusBarHeight } = Constants;

// Get Platform 
export const isAndroid = Platform.OS === 'android'

// Get Screen Insets for ( Top, Bottom , Left , Right)
export const screenInsets = initialWindowMetrics?.insets

export const bottomInsets = isAndroid ? 0 : screenInsets?.bottom


