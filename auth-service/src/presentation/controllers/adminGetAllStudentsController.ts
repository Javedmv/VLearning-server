import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";

export const adminGetAllStudentsController = (dependencies:IDependencies) => {
    const { useCases: {getAllStudentsUseCase} } = dependencies;

    return async(req:Request, res:Response, next:NextFunction) => {
        try {
            const { page, limit} = req.query;
            const filters = {
                page: parseInt(page as string, 10) || 1,
                limit: parseInt(limit as string, 10) || 6,
            }
            const {studentUser, totalStudents } = await getAllStudentsUseCase(dependencies).execute(filters);

            const totalPages = Math.ceil(totalStudents / filters.limit);

            res.status(200).json({
                success:true,
                data: studentUser,
                message: "Successfully fetched all student user!!",
                totalPages: totalPages,
                total: totalStudents,
            })
            return;
        } catch (error) {
            console.log(error, "error in ADMIN GET STUDENT CONTROLLER")
            next(error)
        }
    }
}