import React from 'react';
import { DimensionValue, StyleSheet, View, ViewStyle } from 'react-native';

export interface AppViewProps {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  alignSelf?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline' | 'auto';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  gap?: number;
  center?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  w?: DimensionValue;
  h?: DimensionValue;
  flex?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  position?: 'absolute' | 'relative';
  overflow?: 'visible' | 'hidden' | 'scroll';
  // Add more ViewStyle properties as needed
}

const AppView: React.FC<AppViewProps> = ({
  children,
  style,
  alignSelf,
  alignItems,
  justifyContent,
  backgroundColor,
  borderRadius,
  gap,
  center,
  width,
  height,
  w,
  h,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  p,
  m,
  flex,
  flexDirection,
  flexWrap,
  position,
  overflow,
  ...rest // Capture any other props that might be passed
}) => {
  // Create style object only with provided props
  const constructedStyle: ViewStyle = {};
  
  // Only add properties if they are provided
  if (alignSelf !== undefined) constructedStyle.alignSelf = alignSelf;
  if (alignItems !== undefined) constructedStyle.alignItems = alignItems;
  if (justifyContent !== undefined) constructedStyle.justifyContent = justifyContent;
  if (backgroundColor !== undefined) constructedStyle.backgroundColor = backgroundColor;
  if (borderRadius !== undefined) constructedStyle.borderRadius = borderRadius;
  if (gap !== undefined) constructedStyle.gap = gap;
  if (width !== undefined) constructedStyle.width = width;
  if (height !== undefined) constructedStyle.height = height;
  if (w !== undefined) constructedStyle.width = w;
  if (h !== undefined) constructedStyle.height = h;
  if (flex !== undefined) constructedStyle.flex = flex;
  if (flexDirection !== undefined) constructedStyle.flexDirection = flexDirection;
  if (flexWrap !== undefined) constructedStyle.flexWrap = flexWrap;
  if (position !== undefined) constructedStyle.position = position;
  if (overflow !== undefined) constructedStyle.overflow = overflow;
  
  // Handle padding props
  if (p !== undefined) constructedStyle.padding = p;
  if (px !== undefined) constructedStyle.paddingHorizontal = px;
  if (py !== undefined) constructedStyle.paddingVertical = py;
  if (pt !== undefined) constructedStyle.paddingTop = pt;
  if (pr !== undefined) constructedStyle.paddingRight = pr;
  if (pb !== undefined) constructedStyle.paddingBottom = pb;
  if (pl !== undefined) constructedStyle.paddingLeft = pl;
  
  // Handle margin props
  if (m !== undefined) constructedStyle.margin = m;
  if (mx !== undefined) constructedStyle.marginHorizontal = mx;
  if (my !== undefined) constructedStyle.marginVertical = my;
  if (mt !== undefined) constructedStyle.marginTop = mt;
  if (mr !== undefined) constructedStyle.marginRight = mr;
  if (mb !== undefined) constructedStyle.marginBottom = mb;
  if (ml !== undefined) constructedStyle.marginLeft = ml;
  
  // Handle center prop
  if (center) {
    constructedStyle.justifyContent = 'center';
    constructedStyle.alignItems = 'center';
  }

  return (
    <View
      style={[constructedStyle, style]}
      {...rest} // Pass any additional props to the View
    >
      {children}
    </View>
  );
};

// No default styles needed since we're constructing the style object dynamically
const styles = StyleSheet.create({});

export default AppView;