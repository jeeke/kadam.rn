import { useHardwareBackPress } from "./useHardwareBackPress";

export function useHardwareBackPressCB(cb: ()=>void){
    useHardwareBackPress(()=>{
      cb?.()
      return true;
    })
  }
  