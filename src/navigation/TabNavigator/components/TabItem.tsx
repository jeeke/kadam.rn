
import AppPressable from '@/src/components/ui/AppPressable/AppPressable';
import AppText from '@/src/components/ui/AppText/AppText';
import { COLORS } from '@/src/constants/colors';
import { ThemeIcons } from '@/src/theme/Icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';

const TabItem = ({
    state,
    descriptors,
    navigation,
    route,
    index,
}: BottomTabBarProps & { route: any, index: number }) => {

    const _tabData = {
        home: { icon: <ThemeIcons.Tabs.HomeIcon/>, title: 'Home' },
        library: { icon: <ThemeIcons.Tabs.LibraryIcon/>, title: 'Library'  },
        premium: {icon: <ThemeIcons.Tabs.PremiumIcon/>, title: 'Premium' }, 
        profile:{icon: <ThemeIcons.Tabs.UserIcon/>, title: 'Profile' }
    }

    const { options } = descriptors[route.key];
    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
                ? options.title
                : route.name;

    const isActive = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isActive && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, params: {}, merge: true });
        }
    };

    const active = () => {
        if (isActive) {
            return {
                textType: 'latoBold12px',
                color: 'red',
                weight: 'fill'
            }
        }
        return {
            textType: 'latoRegular12px',
            color: '#fff',
            weight: 'regular'
        }
    }

    const TabData = _tabData[label as keyof typeof _tabData]

    return (
        <AppPressable disabled onPress={onPress} style={[styles.container]}>
            {TabData.icon}
         <AppText color={COLORS.white} type={'helveticaRegular12px'} >
            {TabData.title}
         </AppText>
        </AppPressable>
    )
}

export default TabItem


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: "center",
        gap: 4
    }
})