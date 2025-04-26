import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { removeFilesFromS3 } from "../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../_lib/common";

export const deleteBannerController = (dependencies:IDependencies) => {
    const {useCases: {deleteBannerUseCase}} = dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            console.log(id)
            const result = await deleteBannerUseCase(dependencies).execute(id);
            console.log(result?.imageUrl,"--image that has been deleted");
            await removeFilesFromS3(result?.imageUrl);
            console.log(result);
            if(!result){
                res.status(404).json({
                    success: false,
                    message: "Banner deletion failed",
                })
                return
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    undefined,
                    `${result?.title || "Banner"} deleted successfully`
                )
            );
            return;
        } catch (error) {
            console.log(error)
        }
    }
} 