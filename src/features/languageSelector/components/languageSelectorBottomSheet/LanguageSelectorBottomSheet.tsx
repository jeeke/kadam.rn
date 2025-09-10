import RNBottomSheet from '@/src/components/BottomSheets/BottomSheet';
import AppGradientView from '@/src/components/ui/AppGradientView/AppGradientView';
import AppView from '@/src/components/ui/AppView/AppView';
import { COLORS } from '@/src/constants/colors';
import withRootStore from '@/src/HOCs/withRootStore';
import { PropsWithStore } from '@/src/mobxStore/RootStore';
import { EBottomSheet } from '@/src/models/bottomSheet/bottomSheet.interface';
import { screenWidth } from '@/src/utils/resizing';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { FC, } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import LanguageSelectorLanguageActions from '../languageSelectorLanguageActions/LanguageSelectorLanguageActions';

const LanguageSelectorBottomSheet: FC<PropsWithStore<{}>> = ({ rootStore }) => {
    const { bottomSheetStore } = rootStore!
    const { t } = useTranslation()

    return <RNBottomSheet
        backgroundStyle={styles.bottomSheetBackground}
        style={styles.bottomSheetStyle}
        handleComponent={null}
        snapPoints={[500]}
        ref={bottomSheetStore.createBottomRef(EBottomSheet.LANGUAGE_SELECTOR)}
    >
        <BottomSheetView style={styles.bottomSheetView} >
            <SheetBackground />
            <AppView style={{ zIndex: 3 }}>
                <LanguageSelectorLanguageActions isBottomSheet handleContinue={()=>{bottomSheetStore.closeBottomSheet(EBottomSheet.LANGUAGE_SELECTOR)}} />
            </AppView>
        </BottomSheetView>
    </RNBottomSheet>

}

export default withRootStore(LanguageSelectorBottomSheet)


const SheetBackground = () => {
    return <>
        <AppGradientView colors={["transparent", "rgba(12, 9, 23, 0.8)",]} style={[styles.rightSide]} />
        <AppGradientView useAngle angle={180} colors={["rgba(12, 9, 23, 0.5)", "transparent"]} style={[styles.top]} />
        <AppGradientView useAngle angle={180} colors={["#1B1249", "#481E44",]} style={[styles.mainBackground]} />
    </>
}

const styles = StyleSheet.create({
    mainBackground: {
        width: screenWidth,
        height: 500,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    rightSide: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: screenWidth - 50,
        height: 500,
        zIndex: 1
    },
    top: {
        position: 'absolute',
        left: 0,
        top: -20,
        width: screenWidth,
        height: 100,
    },
    bottomSheetBackground: {
        backgroundColor: 'transparent',
        borderRadius: 48,        
    },
    bottomSheetStyle: {
        paddingHorizontal: 0,
    },
    bottomSheetView: {
        height: 499,
        overflow: 'hidden',
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
        borderWidth: 0,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: COLORS.borderColor_292929,
    }
})

