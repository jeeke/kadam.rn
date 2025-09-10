import { FlatList, StyleSheet } from 'react-native';

import PageHeader from '@/src/components/Headers/PageHeader/PageHeader';
import BackgroundWrapper from '@/src/components/wrappers/backgroundWrapper/BackgroundWrapper';
import { CategoryGridItem } from '../components/categoryGridItem/CategoryGridItem';
import CategoryScreenHeader from '../components/categoryScreenHeader/CategoryScreenHeader';
import { CategoryTabs } from '../components/categoryTabs/CategoryTabs';

export const CategoryScreen = () => {
  const categories = [
    {
      id: '1',
      title: 'Adventure',
      imageUrl: "https://images.unsplash.com/photo-1611321767083-6f9783066f32?q=80&w=1794&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: '2',
      title: 'Science Fiction',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1668447597592-fccff521bf42?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFubmVyc3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: '3',
      title: 'Fantasy',
      imageUrl: 'https://images.unsplash.com/photo-1630514168444-69eaf2ed8089?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVydGljYWwlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: '4',
      title: 'Thriller',
      imageUrl: 'https://images.unsplash.com/photo-1618356387902-245c575733f0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmVydGljYWwlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
    },
    {
      id: '5',
      title: 'Romance',
      imageUrl: 'https://images.unsplash.com/photo-1618356387595-efd16959f8ea?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZlcnRpY2FsJTIwaW1hZ2VzfGVufDB8fDB8fHww',
    },
    {
      id: '6',
      title: 'Horror',
      imageUrl: 'https://images.unsplash.com/photo-1630514168444-69eaf2ed8089?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVydGljYWwlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D',
    },
  ];

  const renderCategoryItem = ({ item , index }: { item: any, index:number }) => {
    return <CategoryGridItem item={item} index={index} onPress={(category) => console.log('Category pressed:', category.title)} />
  }
  return (
    <BackgroundWrapper>
      <PageHeader.Spaced title={'Sarkari Kaam'} />
      <CategoryTabs tabs={['Aadhar Services', 'Sarkari Scheme', 'State Gov Scheme', 'Science', 'History', 'Fantasy']} onTabPress={(index) => console.log('Tab pressed:', index)} />
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<CategoryScreenHeader/>}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={{gap: 19}}
        ListHeaderComponentStyle={{alignSelf:'flex-start'}}
      />
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 27,
    gap:21, 
    alignItems:'center', 
    paddingBottom: 100
  },
});
