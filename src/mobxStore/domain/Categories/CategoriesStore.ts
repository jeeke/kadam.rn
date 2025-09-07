import { makeAutoObservable, observable } from "mobx";
import { ICategoriesItem } from "../../../features/Categories/models/categories.interface";
import { fetchCategories } from "../../../features/Categories/services/categories.service";


export class CategoriesStore {
   @observable categories: ICategoriesItem[] = [];
   @observable isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async callFetchCategories() {
        this.isLoading = true;
        try {
            this.categories = await fetchCategories();
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        } finally {
            this.isLoading = false;
        }
    }
}
