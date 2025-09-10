import BackgroundWrapper from '@/src/components/wrappers/backgroundWrapper/BackgroundWrapper'
import CategoriesList from '@/src/features/Categories/components/categories/CategoriesList'
import HomeCarousel from '@/src/features/HomeCarousel/components/homeCarousel/HomeCarousel'
import { isAndroid } from '@/src/utils/resizing'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import HomeHeader from './components/homeHeader/HomeHeader'
import HomeSearch from './components/homeSearch/HomeSearch'

const HomeScreen = () => {
  //  return <LanguageSelectorBottomSheet/>
  return (
    <BackgroundWrapper>
      <HomeHeader />
      <ScrollView contentContainerStyle={[styles.contentContainerStyle]} >
        <HomeSearch />
        <HomeCarousel />
        <CategoriesList />
      </ScrollView>
    </BackgroundWrapper>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  contentContainerStyle:{
    paddingBottom: isAndroid ? 160 : 130, 
    alignItems:'center'
  }
})