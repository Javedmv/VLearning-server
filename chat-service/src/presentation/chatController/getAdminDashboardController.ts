import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies";
import { createResponse, StatusCode } from "../../_lib/constants";

export const getAdminDashboardController = (dependencies: IDependencies) => {
    const {useCases: {adminGetAllDashboardDataUseCase, adminGetPopularCoursesUseCase, adminGetEnrollmentDataUseCase}} = dependencies
    return async(req:Request,res:Response,next:NextFunction): Promise<void> => {
        try {
            if(!req.user){
                res.status(401).json({message:"Unauthorized"});
                return
            }
            const {_id} = req.user;
            const result = await adminGetAllDashboardDataUseCase(dependencies).execute();

            const popularCourses = await adminGetPopularCoursesUseCase(dependencies).execute();

            const enrollmentData = await adminGetEnrollmentDataUseCase(dependencies).execute();

            const data = {
                courseCount: result.courseCount,
                instructorCount: result.instructorCount,
                studentCount: result.studentCount,
                popularCourses,
                enrollmentData
            }

            const response = createResponse(StatusCode.SUCCESS,data)
            res.status(StatusCode.SUCCESS).json(response)
            return;
        } catch (error) {
            next(error);
        }
    }
}