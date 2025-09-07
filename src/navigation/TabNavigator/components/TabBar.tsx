

import AppGradientView from '@/src/components/ui/AppGradientView/AppGradientView';
import AppRow from '@/src/components/ui/AppRow/AppRow';
import { isAndroid, screenWidth } from '@/src/utils/resizing';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import TabItem from './TabItem';

export const TabBar = ({
    state,
    ...rest
}: BottomTabBarProps) => {
    return <BlurView  experimentalBlurMethod={'dimezisBlurView'} tint={'systemUltraThinMaterialDark'} intensity={30} style={[styles.container, {backgroundColor: ''}]}>
        <AppGradientView useAngle angle={180} colors={['#716B77', '#140E18']} style={[styles.gradientBorder]} />
        <AppRow justifyContent={'space-around'} style={{ zIndex: 1, }}>
            {state.routes.map((route: any, index: number) => {
                return <TabItem state={state} {...rest} route={route} index={index} />
            })}
        </AppRow>
    </BlurView>
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        gap: screenWidth * 0.3,
        borderRadius: 0,
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: 18,
        paddingHorizontal: 16, 
        paddingBottom: isAndroid ? 18: 28, 
    },
    navbarBg: {
        width: '100%',
        position: 'absolute',
    },
    gradientBorder: {
        height: 1,
        width: screenWidth,
        position: 'absolute',
        top: 0
    }
})