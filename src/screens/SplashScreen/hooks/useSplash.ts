


import { MMKV_KEYS } from "@/src/constants/mmkvConstants"
import { RootStoreType } from "@/src/mobxStore/RootStore"
import { RootStackScreens } from "@/src/navigation/RootStack/types"

import { USER_KEY } from "@/src/services/token.service"
import { navigate, resetAndNavigate } from "@/src/utils/NavigationUtils"
import MMKVStorage from "@/src/utils/storages/MMKVStorage/MMKVStorage"
import { getSecureItem } from "@/src/utils/storages/SecuredStorage/SecuredStorage"
import { useEffect } from "react"

export const useSplash = (rootStore: RootStoreType) => {
    const { loginStore, authStore } = rootStore!
    const appLanguage = MMKVStorage.mmkvGetItem(MMKV_KEYS.APP_LANGUAGE) || 'en';

    let user: any
    const checkedUserLoggedIn = async () => {
        try {
            const userData = await getSecureItem(USER_KEY)
            user = userData ? JSON.parse(userData) : !!userData
        } catch (error) {
            console.log("error on login", error)
            navigate(RootStackScreens.MainScreen)
        }

    }

    const handleNavigation = async () => {
        try {
            if (!!user) {
                resetAndNavigate(RootStackScreens.MainScreen)
            } else {
                navigate(RootStackScreens.MainScreen)
            }
        } catch (error) {
            console.log("error on login: useSplash", error)
        }

    }

    useEffect(() => {

        let timer = setTimeout(async () => {
            // await checkedUserLoggedIn()
            // await handleNavigation()

            (async () => {
                try {
                    // await rootStore.firebaseStore.fetchRemoteConfig()
                    // i18next.changeLanguage(appLanguage);
                    resetAndNavigate(RootStackScreens.LanguageSelectorScreen)
                } catch (error) {
                   console.log("Error remote config:", error)
                }

            })()


        }, 2800)
        return () => {
            clearTimeout(timer)
        }
    }, [])
}