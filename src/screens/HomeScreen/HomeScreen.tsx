import PageHeader from '@/src/components/Headers/PageHeader/PageHeader'
import AppView from '@/src/components/ui/AppView/AppView'
import React from 'react'
import { Text } from 'react-native'

const HomeScreen = () => {
  return (
    <AppView center style={{flex:1 , backgroundColor:'#fff'}} >
      <PageHeader.Spaced showLeft={false} />
      <Text>HomeScreen</Text>
    </AppView>
  )
}

export default HomeScreen