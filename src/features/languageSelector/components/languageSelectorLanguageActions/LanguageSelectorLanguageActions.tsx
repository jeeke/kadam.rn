import KadamButton from '@/src/components/kadam/buttons/KadamButton'
import AppView from '@/src/components/ui/AppView/AppView'
import { COLORS } from '@/src/constants/colors'
import { MMKV_KEYS } from '@/src/constants/mmkvConstants'
import withRootStore from '@/src/HOCs/withRootStore'
import { Localizations } from '@/src/locales/localizationTypes'
import { PropsWithStore } from '@/src/mobxStore/RootStore'
import { RootStackScreens } from '@/src/navigation/RootStack/types'
import { resetAndNavigate } from '@/src/utils/NavigationUtils'
import { screenInsets, screenWidth } from '@/src/utils/resizing'
import MMKVStorage from '@/src/utils/storages/MMKVStorage/MMKVStorage'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet } from 'react-native'
import { ELangugaes } from '../../models/languageSelector.interface'
import LanguageSelectorHeader from '../languageSelectorHeader/LanguageSelectorHeader'
import LanguageSelectorLanguageAction from './LanguageSelectorLanguageAction'

const languages = [
  {
    "key": ELangugaes.EN,
    "label": "English"
  },
  {
    "key": ELangugaes.HI,
    "label": "Hindi"
  }
]

const LanguageSelectorLanguageActions: FC<PropsWithStore<{}>> = ({ rootStore }) => {
  const { firebaseStore } = rootStore!
  const [selectedLanguage, setSelectedLanguage] = useState(MMKVStorage.mmkvGetItem(MMKV_KEYS.APP_LANGUAGE) || 'en')
  const { t } = useTranslation()
  const handleSelect = useCallback(async (code: ELangugaes) => {
    try {
      await firebaseStore.i18nInstance?.changeLanguage(code);
      MMKVStorage.mmkvSetItem(MMKV_KEYS.APP_LANGUAGE, code);
      setSelectedLanguage(code)
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }, []);

  const onPressContinue = useCallback(() => {
    resetAndNavigate(RootStackScreens.Login)
  }, [])

  const selected = useCallback((language: ELangugaes) => selectedLanguage === language, [selectedLanguage])

  return (
    <AppView mt={screenInsets?.top}  >
      <LanguageSelectorHeader />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        {languages.map((item) => {
          return <LanguageSelectorLanguageAction selected={selected} key={item.key} item={item} onPress={handleSelect} />
        })}
        <KadamButton.Primary onPress={onPressContinue} mt={8} w={screenWidth - 36} text={t(Localizations.login.continue)} />
      </ScrollView>
    </AppView>
  )
}

export default withRootStore(LanguageSelectorLanguageActions)

const styles = StyleSheet.create({
  container: {
    width: screenWidth - 36,
    overflow: 'hidden',
    borderRadius: 15,
  },
  gradient: {
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: COLORS.borderColor_3E3E3E,
    borderRadius: 15,
    overflow: 'hidden'
  },
  blurView: {
    overflow: 'hidden'
  },
  contentContainerStyle: {
    gap: 8,
    marginTop: 22

  },
})
