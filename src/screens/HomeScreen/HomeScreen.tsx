import BackgroundWrapper from '@/src/components/wrappers/backgroundWrapper/BackgroundWrapper'
import CategoriesList from '@/src/features/Categories/components/categories/CategoriesList'
import HomeCarousel from '@/src/features/HomeCarousel/components/homeCarousel/HomeCarousel'
import React from 'react'
import { ScrollView } from 'react-native'
import HomeHeader from './components/homeHeader/HomeHeader'
import HomeSearch from './components/homeSearch/HomeSearch'

const HomeScreen = () => {
  return (
    <BackgroundWrapper>
      <HomeHeader />
      <ScrollView contentContainerStyle={[{alignItems:"center"}]} >
        <HomeSearch />
        <HomeCarousel />
        <CategoriesList />
      </ScrollView>
    </BackgroundWrapper>
  )
}

export default HomeScreen