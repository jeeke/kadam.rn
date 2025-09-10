import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import React from "react";
import { TextStyle } from "react-native";

interface AppStrokeTextProps {
  text?: string;
  strokeColor?: string;
  strokeWidth?: number;
  color?: string;
  style?: TextStyle;
}

export const AppStrokeText: React.FC<AppStrokeTextProps> = ({ text, strokeColor, strokeWidth, color, style, ...rest }) => {
  return (
    <StrokeText
      text={text}
      strokeColor={strokeColor}
      strokeWidth={strokeWidth}
      color={color}
      textStyle={style}
      {...rest}
    />
  );
};
