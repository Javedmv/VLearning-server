import { TOBE } from "../../_lib/common/Tobe";
import { CourseEntity } from "../../domain/entities";
import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllCoursesUseCase = (dependencies: IDependencies) => {
    const { repositories: { getAllCourses } } = dependencies;
    return {
        execute: async (filters: CourseFilters): Promise<TOBE> => {
            try {
                const { courses, total } = await getAllCourses(filters);
                return { courses: courses || [], total: total || 0 };
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Category fetch failed");
                } else {
                    throw new Error("Category fetch failed due to an unknown error");
                }
            }
            
        },
    };
};
