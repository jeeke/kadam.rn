import InfinteCarousel from '@/src/components/Carousels/InfiniteCarousel'
import BackgroundWrapper from '@/src/components/wrappers/backgroundWrapper/BackgroundWrapper'
import CategoriesList from '@/src/features/Categories/components/categories/CategoriesList'
import { isAndroid } from '@/src/utils/resizing'
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import HomeHeader from './components/homeHeader/HomeHeader'
import HomeSearch from './components/homeSearch/HomeSearch'

const HomeScreen = () => {
  return (
    <BackgroundWrapper>
      <HomeHeader />
      <ScrollView contentContainerStyle={[styles.contentContainerStyle]} >
        <HomeSearch />
        <InfinteCarousel/>
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