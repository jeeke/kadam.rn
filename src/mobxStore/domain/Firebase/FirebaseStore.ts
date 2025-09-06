import { ELangugaes } from '@/src/features/languageSelector/models/languageSelector.interface';
import { initI18n } from '@/src/locales/i18n';
import remoteConfig from '@react-native-firebase/remote-config';
import { i18n } from 'i18next';
import { action, makeAutoObservable, observable } from "mobx";
import type { RootStoreType } from "../../RootStore";

export class FirebaseStore {
  rootStore: RootStoreType;
  
  @observable i18nInstance: i18n | undefined = undefined
  @observable remoteConfigValues: Record<string, any> = {}

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  async fetchRemoteConfig() {
    try {
      const rc = remoteConfig();

      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 0, // always fetch fresh values
      });

      await rc.fetchAndActivate();

      const allKeys = rc.getAll();
      const parsedValues: Record<string, any> = {};

      
      Object.keys(allKeys).forEach(key => {
        const value = allKeys[key].asString();

        try {
          // If it's valid JSON → parse
          parsedValues[key] = JSON.parse(value);
        } catch {
          // Otherwise store raw string
          parsedValues[key] = value;
        }
      });
      this.remoteConfigValues = parsedValues

      // Initialize i18n with the fetched resources
      const resources = {
        [ELangugaes.EN]: { translation: this.remoteConfigValues.kadamEN },
        [ELangugaes.HI]: { translation: this.remoteConfigValues.kadamHI },
      };
      
      this.i18nInstance = initI18n(resources);

      // console.error("ppp", this.remoteConfigValues.kadamEN)

    } catch (error) {
      console.error("Error fetching remote config:", error);
    }
  }

  @action
  async logout() {
    this.remoteConfigValues = {};
  }
}
