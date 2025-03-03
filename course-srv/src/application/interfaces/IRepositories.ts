import { CategoryEntity, CourseEntity, IEnrollmentProgressResult, UpdateCategoryEntity } from "../../domain/entities";
import { CourseFilters } from "../../domain/entities/CourseFilter";
import { LessonObject } from "../../presentation/controllers/courseController/postupdatedWatched";

export interface IRepositories {
    addCategory:(category:CategoryEntity) => Promise<CategoryEntity | null>
    getAllCategory: () => Promise<CategoryEntity[] | null>
    updateCategory: (catId:string, category:UpdateCategoryEntity) => Promise<CategoryEntity | null>;
    updateCategoryStatus: (catId:string, status:Boolean) => Promise<Boolean | null>;
    deleteCategory: (catId:string) => Promise<CategoryEntity | null>
    getActiveCategory: () => Promise<CategoryEntity[] | null>
    addCourse: (course:CourseEntity,instrId:string) => Promise<CourseEntity | null>
    getAllCourses: (filters:CourseFilters) => Promise<any>
    getAllInstructorCourses: (instrId:string,filters:CourseFilters) => Promise<any>
    getCourseDetails: (courseId:string) => Promise<CourseEntity | null>;
    enrollUser: (courseId:string,userId:string) => Promise<any>;
    getInstructorDetails:(instrId:string) => Promise<any>;
    getAllCoursesInstructor:(instructorId:string) => Promise<any>;
    editCourse: (courseId:string, updates:any,removeLessonIndex: number[]) => Promise<any>;

    getAllMyLearning:(userId:string) => Promise<any>
    courseDetailMyLearning(enrollmentId:string,userId:string): Promise<IEnrollmentProgressResult[]>
    updateProgress(enrollmentId:string,lessonObject:LessonObject,allLessons:LessonObject[]): Promise<any>
}