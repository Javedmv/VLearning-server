import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { Lesson } from './getAllCoursesController';

export interface LessonObject extends Lesson {
    _id: string;
}

export const postupdatedWatched = (dependencies:IDependencies) => {
    const {useCases:{ updateProgressUseCase }} = dependencies;
    return async(req:Request,res:Response,next:NextFunction) => {
        try {
            const {enrollmentId} = req.params;
            const { lessonObject, allLessons } = req.body
            console.log(lessonObject,allLessons,"lessonObject,allLessons")
            if(!req.user){
                throw new Error("Unauthorized");
            }
            const result = await updateProgressUseCase(dependencies).execute(enrollmentId,lessonObject,allLessons);
            if(!result){
                res.status(404).json({success:false, message:"No enrollment found"});
                return;
            }
            console.log(result,"result")
            res.status(200).json({
                success: true,
                data:result
            })
            return;
        } catch (error) {
            next(error);
            console.log("ERROR in postupdatedWatched",error)
        }
    }
}