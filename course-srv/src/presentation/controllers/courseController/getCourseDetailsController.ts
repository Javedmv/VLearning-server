import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { updateCourse } from "../../../_lib/common/updateCourse";

export const getCourseDetailsController = (dependencies: IDependencies) => {
  const { useCases: { getCourseDetailUseCase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req?.params?.id;
      const result = await getCourseDetailUseCase(dependencies).execute(courseId);
        
    //   function to update the course with url in the s3
      const updatedCourse = await updateCourse(result);

      res.status(200).json({
        data: updatedCourse,
        message: "Course data fetched",
      });
      return;
    } catch (error) {
      console.error("Error in getCourseDetailsController:", error);
      next(error);
    }
  };
};
