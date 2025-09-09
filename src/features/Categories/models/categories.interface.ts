export interface ICategoriesItem {
    id: number;
    title: string;
    image: string;
}

export interface IPopularCategoriesItem {
    id: number;
    name: string;
    image_url: string;
}

export interface PopularCategoriesApiResponse {
    success: boolean;
    data: {
        popularCategories: IPopularCategoriesItem[];
    };
    message: string;
    error: string;
}

export interface CourseItem {
    id: number;
    name: string;
    description: string;
    is_paid: boolean;
    price: number;
    thumbnail_url: string;
    certificate_url: string;
    avg_rating: number;
    num_ratings: number;
    created_at: string;
    updated_at: string;
}

export interface CategoryCoursesApiResponse {
    courses: CourseItem[];
}
