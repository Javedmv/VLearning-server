import { TOBE } from "../../_lib/common/Tobe";
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
    getAllCourses: (filters:CourseFilters) => Promise<TOBE>
    getAllInstructorCourses: (instrId:string,filters:CourseFilters) => Promise<TOBE>
    getCourseDetails: (courseId:string) => Promise<CourseEntity | null>;
    enrollUser: (courseId:string,userId:string) => Promise<TOBE>;
    getInstructorDetails:(instrId:string) => Promise<TOBE>;
    getAllCoursesInstructor:(instructorId:string) => Promise<TOBE>;
    editCourse: (courseId:string, updates:TOBE,removeLessonIndex: number[]) => Promise<TOBE>;

    getAllMyLearning:(userId:string) => Promise<TOBE>
    courseDetailMyLearning(enrollmentId:string,userId:string): Promise<IEnrollmentProgressResult[]>
    updateProgress(enrollmentId:string,lessonObject:LessonObject,allLessons:LessonObject[]): Promise<TOBE>

    instructorRepository: (instructorId:string) => Promise<TOBE>
    getEnrollment: (enrollmentId:string) => Promise<TOBE>

    getLandingPageCourses: () => Promise<TOBE>
    getLandingPageInstructors: () => Promise<TOBE>
}