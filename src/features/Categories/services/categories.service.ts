import { ICategoriesItem } from "../models/categories.interface";

const staticCategoriesData: ICategoriesItem[] = [
    { id: '1', title: 'Category 1', image: 'https://picsum.photos/200' },
    { id: '2', title: 'Category 2', image: 'https://picsum.photos/200' },
    { id: '3', title: 'Category 3', image: 'https://picsum.photos/200' },
    { id: '4', title: 'Category 4', image: 'https://picsum.photos/200' },
    { id: '5', title: 'Category 5', image: 'https://picsum.photos/200' },
    { id: '6', title: 'Category 6', image: 'https://picsum.photos/200' },
];

export const fetchCategories = async (): Promise<ICategoriesItem[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(staticCategoriesData);
        }, 500); // Simulate network delay of 500ms
    });
};
