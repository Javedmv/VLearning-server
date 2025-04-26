import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { Lesson } from './getAllCoursesController';
import { createResponse, StatusCode } from "../../../_lib/constants";

export interface LessonObject extends Lesson {
    _id: string;
}

export const postupdatedWatched = (dependencies:IDependencies) => {
    const {useCases:{ updateProgressUseCase }} = dependencies;
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            const {enrollmentId} = req.params;
            const { lessonObject, allLessons } = req.body
            if(!req.user){
                throw new Error("Unauthorized");
            }
            const result = await updateProgressUseCase(dependencies).execute(enrollmentId,lessonObject,allLessons);
            if(!result){
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined,
                        "No enrollment found"
                    )
                );
                return;
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    result
                )
            );
            return;
        } catch (error) {
            next(error);
            console.log("ERROR in postupdatedWatched",error)
        }
    }
}