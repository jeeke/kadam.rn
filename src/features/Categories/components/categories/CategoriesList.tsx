
import { SectionHeader } from '@/src/components/Headers/SectionHeader/SectionHeader';
import AppView from '@/src/components/ui/AppView/AppView';
import withRootStore from '@/src/HOCs/withRootStore';
import { PropsWithStore } from '@/src/mobxStore/RootStore';
import React, { FC, useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { CategoriesItem, GAP } from './CategoriesItem';

const categoriesData = [
    { id: '1', title: 'Category 1', image: 'https://picsum.photos/200' },
    { id: '2', title: 'Category 2', image: 'https://picsum.photos/200' },
    { id: '3', title: 'Category 3', image: 'https://picsum.photos/200' },
    { id: '4', title: 'Category 4', image: 'https://picsum.photos/200' },
    { id: '5', title: 'Category 5', image: 'https://picsum.photos/200' },
    { id: '6', title: 'Category 6', image: 'https://picsum.photos/200' },
];

const CategoriesList: FC<PropsWithStore<{}>> = ({ rootStore }) => {
    const { categoriesStore } = rootStore!
    useEffect(() => {
        categoriesStore.callFetchCategories()
    }, [])
    return (
        <AppView style={styles.container}>
            <SectionHeader mt={20} mb={18} title={'Popular Category'} />
            <FlatList
                data={rootStore.categoriesStore.categories}
                renderItem={({ item }) => <CategoriesItem item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.columnWrapper}
                contentContainerStyle={styles.contentContainer}
            />
        </AppView>
    )
}

export default withRootStore((CategoriesList))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: GAP,
    },
    columnWrapper: {
        justifyContent: 'flex-start',
    },
    contentContainer: {
        paddingBottom: GAP,
        alignItems: "center",
    },
});