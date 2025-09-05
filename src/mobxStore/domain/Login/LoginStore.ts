

import { RootStackScreens } from "@/src/navigation/RootStack/types";
import { resetAndNavigate } from "@/src/utils/NavigationUtils";
import { action, makeAutoObservable, observable } from "mobx";
import { Keyboard } from "react-native";
import type { RootStoreType } from "../../RootStore";
export class LoginStore {
  rootStore: RootStoreType;

  @observable isLoading: boolean = false;
  @observable error: string | null = null;
  @observable isAuthenticated: boolean = false;
  @observable isOtpFetched: boolean = false

  @observable mobileNumber: string = ''

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore
    makeAutoObservable(this);
  }

  @action
  setMobileNumber(number: string) {
    this.mobileNumber = number
    if(this.mobileNumber.length === 10) {
      this.callSendOtp()
    }
  }

  @action
  async callSendOtp() {
    this.isLoading = true
    try {
      //  await sendOtp()
      this.isOtpFetched = true
    } catch (error) {
      console.log('Error sending otp:', error)
    } finally {
      this.isLoading = false
    }
  }
  @action
  async callVerifyOtp(otp: string) {
    this.isLoading = true
    try {
      Keyboard.dismiss()
      //  await sendOtp()
      resetAndNavigate(RootStackScreens.MainScreen)
    } catch (error) {
      console.log('Error sending otp:', error)
    } finally {
      // this.isLoading = false
    }
  }

  @action
  async logout() {
    this.isAuthenticated = false;
    this.error = null;
    this.isLoading = false;
  }
}