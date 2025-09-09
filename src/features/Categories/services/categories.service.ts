import { ApiClient } from "@/src/apiClient/ApiWrapper";
import { CategoryCoursesApiResponse, PopularCategoriesApiResponse } from "../models/categories.interface";

export const getPopularCategories = async () => {
    return await ApiClient.get<PopularCategoriesApiResponse>('/courses/popular-categories');
};

export const getCategoryCourses = async (categoryId: number) => {
    return ApiClient.get<CategoryCoursesApiResponse>(`/courses/category/${categoryId}`);
};
