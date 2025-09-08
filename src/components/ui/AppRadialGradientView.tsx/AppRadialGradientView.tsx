import React from "react";
import { DimensionValue, StyleSheet, ViewStyle } from "react-native";
import RadialGradient from "react-native-radial-gradient";

export interface AppRadialGradientViewProps {
    children?: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    borderRadius?: number;
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
    center?: boolean;
    colors?: string[];
    stops?: number[]; // 0–1 range
    radius?: number;
}

const AppRadialGradientView: React.FC<AppRadialGradientViewProps> = ({
    children,
    style,
    borderRadius,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    w,
    h,
    center,
    colors = ["#4c669f", "#3b5998", "#192f6a"],
    ...rest
}) => {
    const constructedStyle: ViewStyle = {};

    if (borderRadius !== undefined) constructedStyle.borderRadius = borderRadius;
    if (w !== undefined) constructedStyle.width = w;
    if (h !== undefined) constructedStyle.height = h;

    // padding
    if (p !== undefined) constructedStyle.padding = p;
    if (px !== undefined) constructedStyle.paddingHorizontal = px;
    if (py !== undefined) constructedStyle.paddingVertical = py;
    if (pt !== undefined) constructedStyle.paddingTop = pt;
    if (pr !== undefined) constructedStyle.paddingRight = pr;
    if (pb !== undefined) constructedStyle.paddingBottom = pb;
    if (pl !== undefined) constructedStyle.paddingLeft = pl;

    // margin
    if (m !== undefined) constructedStyle.margin = m;
    if (mx !== undefined) constructedStyle.marginHorizontal = mx;
    if (my !== undefined) constructedStyle.marginVertical = my;
    if (mt !== undefined) constructedStyle.marginTop = mt;
    if (mr !== undefined) constructedStyle.marginRight = mr;
    if (mb !== undefined) constructedStyle.marginBottom = mb;
    if (ml !== undefined) constructedStyle.marginLeft = ml;

    if (center) {
        constructedStyle.justifyContent = "center";
        constructedStyle.alignItems = "center";
    }

    return (
        <RadialGradient
            style={[constructedStyle, style]}
            colors={colors}
            {...rest}
        >
            {children}
        </RadialGradient>
    );
};

const styles = StyleSheet.create({});

export default AppRadialGradientView;
