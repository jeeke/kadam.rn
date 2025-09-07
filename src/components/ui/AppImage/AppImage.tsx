import { screenWidth } from "@/src/utils/resizing";
import FastImage from "@d11/react-native-fast-image";
import React, { useState } from 'react';
import { ActivityIndicator, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type AppImageProps = {
  source: { uri: string } | number;
  style?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  loaderColor?: string;
  defaultSource?: number;
  fallbackSource?: number;
  children?: React.ReactNode;
  aspectRatio?: number; // width/height ratio (e.g., 100/400 = 0.25)
  baseWidth?: number; // defaults to 360
};


 // Calculate dimensions based on aspect ratio and base width
 export const calculateDimensions = (aspectRatio: number, baseWidth:number = 430) => {
  if (!aspectRatio) return {};
  
  const scaleFactor = screenWidth / baseWidth;
  const calculatedWidth = baseWidth * scaleFactor;
  const calculatedHeight = calculatedWidth / aspectRatio;

  return {
    width: calculatedWidth,
    height: calculatedHeight,
  };
};

const AppImage: React.FC<AppImageProps> = ({
  source,
  style,
  containerStyle,
  resizeMode = 'cover',
  loaderColor = '#999',
  defaultSource,
  fallbackSource,
  children,
  aspectRatio,
  baseWidth = 430,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isRemote = typeof source === 'object' && 'uri' in source;
  const imageSource = error && fallbackSource ? fallbackSource : source;

  const imageStyles = [
    styles.image,
    style,
    aspectRatio ? calculateDimensions(aspectRatio, baseWidth) : {},
  ];

  return (
    <View style={[styles.container, containerStyle]}>
      {isRemote && loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="small" color={loaderColor} />
        </View>
      )}

      <FastImage
        style={imageStyles as any}
        source={imageSource}
        resizeMode={resizeMode}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => setError(true)}
        defaultSource={defaultSource}
      >
        {children}
      </FastImage>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default AppImage;