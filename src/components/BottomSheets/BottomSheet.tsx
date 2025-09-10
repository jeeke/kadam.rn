import BottomSheet, { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import React, { forwardRef, ReactNode, useCallback, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';


interface CustomBottomSheetProps extends BottomSheetModalProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  snapPoints?: Array<string | number>;
  modal?: boolean;
  snapPointsIndex?: number;
  onChange?: (index: number) => void;
  backgroundStyle?: ViewStyle;
  onClose?: () => void;
  isOpen?: boolean;
  enableContentPanningGesture?: boolean;
}

type Ref = React.RefObject<BottomSheetModal>;

const RNBottomSheet = forwardRef<BottomSheetModal, CustomBottomSheetProps>(
  (
    {
      children,
      enableContentPanningGesture = true,
      snapPoints,
      onChange,
      modal = true,
      snapPointsIndex = 1,
      style,
      backgroundStyle,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const BottomSheetComp = modal ? BottomSheetModal : BottomSheet;
    const snapPointsDefault = useMemo(() => ['25%', '50%'], []);

 

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop {...props} opacity={0.5} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior="close" />
      ),
      [],
    );

    return (
      <BottomSheetComp
        enableContentPanningGesture={enableContentPanningGesture}
        enableDismissOnClose={true}
        onDismiss={onClose}
        onClose={onClose}
        handleIndicatorStyle={styles.indicatorStyle}
        backdropComponent={renderBackdrop}
        ref={ref}
        index={snapPointsIndex}
        backgroundStyle={[styles.backgroundStyle, StyleSheet.flatten(backgroundStyle)]}
        style={[styles.style, StyleSheet.flatten(style)]}
        snapPoints={snapPoints ?? snapPointsDefault}
        onChange={index => {
          onChange && onChange(index);
          index === -1 && onClose?.();
        }}
        {...rest}
        >
        {children}
      </BottomSheetComp>
    );
  },
);

export default RNBottomSheet;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#1C1B1E',
  },
  indicatorStyle: {
    backgroundColor: '#4c494f',
  },
  style: {paddingHorizontal: 16},
});