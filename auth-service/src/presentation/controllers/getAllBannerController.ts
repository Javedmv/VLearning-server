import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../_lib/common";

export const getAllBannerController = (dependencies: IDependencies) => {
    const { useCases: { getAllBannerUseCase } } = dependencies;
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.user){
                res.status(StatusCode.UNAUTHORIZED).json(
                    createResponse(
                        StatusCode.UNAUTHORIZED,
                        undefined,
                        "Unauthorized"
                    )
                );
                return;
            }
            const result = await getAllBannerUseCase(dependencies).execute();

            if (!result || result.length === 0) {
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined,
                        "No banner found"
                    )
                );
                return;
            }
            await Promise.all(result.map(async (banner) => {
                if (banner?.imageUrl) {
                    const publicBannerUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!, banner?.imageUrl);
                    banner.imageUrl = publicBannerUrl;
                }
            }));
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    result,
                    "Banner fetched successfully"
                )
            );
            return;
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error from getAllBannerController",
            })
            return;
        }
    }
}