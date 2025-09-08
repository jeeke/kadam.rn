


import { MMKV_KEYS } from "@/src/constants/mmkvConstants";
import { RootStoreType } from "@/src/mobxStore/RootStore";
import { RootStackScreens } from "@/src/navigation/RootStack/types";

import { ACCESS_TOKEN_KEY } from "@/src/services/token.service";
import { navigate, resetAndNavigate } from "@/src/utils/NavigationUtils";
import MMKVStorage from "@/src/utils/storages/MMKVStorage/MMKVStorage";
import { getSecureItem } from "@/src/utils/storages/SecuredStorage/SecuredStorage";
import i18next from "i18next";
import { useEffect } from "react";

export const useSplash = (rootStore: RootStoreType) => {
    const { loginStore, authStore, userStore } = rootStore!
    const appLanguage = MMKVStorage.mmkvGetItem(MMKV_KEYS.APP_LANGUAGE)

    let token: any
    const checkedUserLoggedIn = async () => {
        try {
            const userToken = await getSecureItem(ACCESS_TOKEN_KEY)
            token = userToken
            console.log("DSAFkhdasfk", userToken)
        } catch (error) {
            console.log("error on login", error)
            navigate(RootStackScreens.Login)
        }
    }

    const handleNavigation = async () => {
        try {
            if (!!token) {
                resetAndNavigate(RootStackScreens.MainScreen)
            } else {
                if (appLanguage) {
                    resetAndNavigate(RootStackScreens.Login)
                } else {
                    resetAndNavigate(RootStackScreens.LanguageSelectorScreen)
                }
            }
        } catch (error) {
            console.log("error on login: useSplash", error)
        }

    }

    const fetchRemoteConfig = async () => {
        try {
            await rootStore.firebaseStore.fetchRemoteConfig()
            i18next.changeLanguage(appLanguage || 'en');
          
        } catch (error) {
            console.log("Error remote config:", error)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await fetchRemoteConfig()
                await checkedUserLoggedIn()
                await handleNavigation()
            } catch (error) {
                console.log("Error in remote config:", error)
            }
        })()
    }, [])
}