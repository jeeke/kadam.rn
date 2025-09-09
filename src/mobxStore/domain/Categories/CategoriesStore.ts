import { ICategoriesItem, IPopularCategoriesItem } from "@/src/features/Categories/models/categories.interface";
import { getPopularCategories } from "@/src/features/Categories/services/categories.service";
import { makeAutoObservable, observable } from "mobx";

export class CategoriesStore {
    @observable categories: ICategoriesItem[] = [];
    @observable isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async callFetchCategories() {
        this.isLoading = true;
        try {
            let response = await getPopularCategories()
            if (response.success && response.data?.data.popularCategories) {
                this.categories = this.parsePopularCategories(response.data.data.popularCategories)
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            this.isLoading = false;
        }
    }

    parsePopularCategories(items: IPopularCategoriesItem[]): ICategoriesItem[] {
        return items.map(item => ({
            id: item.id,
            title: item.name,
            image: item.image_url,
        }));
    }
}
