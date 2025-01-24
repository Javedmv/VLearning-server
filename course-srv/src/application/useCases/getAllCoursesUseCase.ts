import { CourseEntity } from "../../domain/entities";
import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllCoursesUseCase = (dependencies: IDependencies) => {
    const { repositories: { getAllCourses } } = dependencies;
    return {
        execute: async (filters: CourseFilters): Promise<any> => {
            try {
                const { courses, total } = await getAllCourses(filters);
                return { courses: courses || [], total: total || 0 };
            } catch (error: any) {
                throw new Error(error?.message || "Category fetch failed");
            }
        },
    };
};
