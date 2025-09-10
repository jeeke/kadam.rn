import AppPressable from '@/src/components/ui/AppPressable/AppPressable';
import AppText from '@/src/components/ui/AppText/AppText';
import { COLORS } from '@/src/constants/colors';
import React, { useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';


interface CategoryTabsProps {
  tabs: string[];
  onTabPress: (item: any, index: number) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ tabs, onTabPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleTabPress = (item: any, index: number) => {
    setActiveIndex(index);
    onTabPress(item, index);
    flatListRef.current?.scrollToIndex({ animated: true, index, viewPosition: 0.5 });
  };

  const renderTabItem = ({ item, index }: { item: string; index: number }) => (
    <AppPressable
      center
      style={[ {height: 38}, activeIndex === index ? styles.activeTabItem : { }]}
      onPress={() => handleTabPress(item, index)}
      px={20}
      my={4}
    >
        <AppText
          type={'helveticaRegular14px'}
          color={COLORS.white}
        >
          {item}
        </AppText>
    </AppPressable>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={tabs}
      renderItem={renderTabItem}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsContainer}
    />
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    paddingHorizontal: 27,
    alignItems: 'center',
    marginVertical: 8
  },
  activeTabItem: {
    borderWidth: 1,
    borderColor: COLORS.borderColor_5E5E5E,
    borderRadius: 16
  },

});
