import { CategoryEntity, CourseEntity, UpdateCategoryEntity } from "../../domain/entities";

export interface IRepositories {
    addCategory:(category:CategoryEntity) => Promise<CategoryEntity | null>
    getAllCategory: () => Promise<CategoryEntity[] | null>
    updateCategory: (catId:string, category:UpdateCategoryEntity) => Promise<CategoryEntity | null>;
    updateCategoryStatus: (catId:string, status:Boolean) => Promise<Boolean | null>;
    deleteCategory: (catId:string) => Promise<CategoryEntity | null>
    getActiveCategory: () => Promise<CategoryEntity[] | null>
    addCourse: (course:CourseEntity,instrId:string) => Promise<CourseEntity | null>
    getAllCourses: () => Promise<CourseEntity[] | null>
    getAllInstructorCourses: (instrId:string) => Promise<CourseEntity[] | null>
    getCourseDetails: (courseId:string) => Promise<CourseEntity | null>;
    enrollUser: (courseId:string,userId:string) => Promise<CourseEntity | null>
}