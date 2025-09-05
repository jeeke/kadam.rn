

import { action, makeAutoObservable, observable } from "mobx";
import type { RootStoreType } from "../../RootStore";
export class LoginStore {
  rootStore: RootStoreType;

  @observable isLoading: boolean = false;
  @observable error: string | null = null;
  @observable isAuthenticated: boolean = false;

  @observable mobileNumber: string = ''

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore
    makeAutoObservable(this);
  }

  @action
  setMobileNumber(number: string){
     this.mobileNumber = number
  }

  @action
  async callSendOtp(){
    this.isLoading = true
    try {
      //  await sendOtp()
    } catch (error) {
         console.log('Error sending otp:', error)
    }finally{
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