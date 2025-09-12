import { trpc } from "@/src/trpc/trpcClient";

export const getPopularCategories = async () => {
    return await trpc.course.getAllCategories.query()
};

export const getCategoryCourses = async (categoryId: number) => {
    return await trpc.course.getCoursesByCategoryId.query({ categoryId });
};
