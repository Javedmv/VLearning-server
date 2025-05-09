import { TOBE } from "../../../../_lib/common/Tobe";
import { EnrollmentProgressModel } from "../models";
import { CourseModel } from "../models/courseSchema";

interface CourseDocument {
    _id: TOBE;
    basicDetails: TOBE;
    instructor: TOBE;  // or more specific type if available
  }
  
  interface UserDocument {
    _id: TOBE;
    username: string;
  }
  
  interface EnrollmentDocument {
    courseId: CourseDocument | TOBE;  // can be populated object or ObjectId
    userId: UserDocument | TOBE;      // can be populated object or ObjectId
  }

export const instructorRepository = async (instructorId:string) => {
    try {

        const courses = await CourseModel.find({instructor:instructorId})

        const totalEnrollments = await EnrollmentProgressModel.find({})
        .select("courseId userId")
        .populate({path: "courseId", select: "basicDetails instructor"})
        .populate({path: "userId", select: "username"})
        .sort({createdAt: -1}) as EnrollmentDocument[];

        const result = totalEnrollments.filter((enrollment) => 
        enrollment?.courseId && 
        typeof enrollment.courseId === 'object' && 
        'instructor' in enrollment.courseId && 
        enrollment.courseId.instructor.toString() === instructorId.toString()
        );



        if(!totalEnrollments){
            throw new Error("Instructor not found");
        }
        return {enrollments:result,courses};
    } catch (error) {
        throw new Error("Error fetching instructor");
    }
}