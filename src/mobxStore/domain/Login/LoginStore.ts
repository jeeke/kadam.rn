

import { ISendOtpRequestPayload, IVerifyOtpRequestPayload } from "@/src/features/login/models/login.interface";
import { sendOtp, verifyOtp } from "@/src/features/login/services/login.service";
import { RootStackScreens } from "@/src/navigation/RootStack/types";
import { resetAndNavigate } from "@/src/utils/NavigationUtils";

import { parseData } from "@/src/utils/apiUtils";
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
    if (this.mobileNumber.length === 10) {
      this.callSendOtp()
    }
  }

  @action
  async callSendOtp() {



    this.isLoading = true
    try {
      const payload: ISendOtpRequestPayload = {
        phone:`+19${this.mobileNumber}`
      }
      await sendOtp(payload)
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
      const payload: IVerifyOtpRequestPayload = {
        phone:`+19${this.mobileNumber}`,
        otp: otp
      }
      const response = await verifyOtp(payload)
      const data = parseData(response) // No longer needed
      if (response) {
        const { accessToken, refreshToken, isNewUser } = response;
        this.rootStore.userStore.isNewUser = isNewUser ?? false
        if (accessToken && refreshToken) {

          await this.rootStore.authStore.saveAuthData(accessToken, refreshToken);
          await this.rootStore.userStore.fetchUser(1)
          this.isAuthenticated = true;
          resetAndNavigate(RootStackScreens.MainScreen);
        }
      }
    } catch (error) {
      console.log('Error verifying otp:', error)
      this.error = 'Invalid OTP'
    } finally {
      this.isLoading = false
    }
  }

  @action
  async logout() {
    this.isAuthenticated = false;
    this.error = null;
    this.isLoading = false;
    this.isOtpFetched = false
    this.mobileNumber = ''
  }
}