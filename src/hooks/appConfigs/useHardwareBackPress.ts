
import { useFocusEffect } from "@react-navigation/native";
import { DependencyList, useCallback } from "react";
import { BackHandler } from "react-native";

export const useHardwareBackPress = (cb: () => boolean | undefined, deps: DependencyList = []) => {
    useFocusEffect(useCallback(()=>{
      const backHandler = BackHandler.addEventListener('hardwareBackPress', cb);
    
        return () => {
          backHandler.remove();
        }
    }, deps))
  };
  