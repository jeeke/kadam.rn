import AppRow from '@/src/components/ui/AppRow/AppRow'
import AppText from '@/src/components/ui/AppText/AppText'
import { COLORS } from '@/src/constants/colors'
import { ThemeIcons } from '@/src/theme/Icons'
import React from 'react'

const CategoryScreenHeader = () => {
  return (
  <AppRow gap={10} mt={30} mb={16}>
    <ThemeIcons.Common.FireIcon/>
    <AppText color={COLORS.white} type={'helveticaMedium16px'}>
      {`Top ${10} in Sarkari kaam`}
    </AppText>
  </AppRow>
  )
}

export default CategoryScreenHeader