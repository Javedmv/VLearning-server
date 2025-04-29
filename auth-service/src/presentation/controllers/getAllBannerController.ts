import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { getPublicUrl } from "../../_lib/s3/s3bucket";
import { createResponse, StatusCode } from "../../_lib/common";
import { CourseFilters } from "../../domain/entities/CourseFilter";
import { IAddBanner } from "../../domain/entities/BannerEntity";

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
            const {page,limit} = req.query;
            const filter:CourseFilters = {
                page: page ? parseInt(page as string) : 1,
                limit: limit ? parseInt(limit as string) : 4,
            }
            const result = await getAllBannerUseCase(dependencies).execute(filter);
            if (!result) {
                res.status(StatusCode.NOT_FOUND).json(
                    createResponse(
                        StatusCode.NOT_FOUND,
                        undefined,
                        "No banner found"
                    )
                );
                return;
            }
            const {banner , total } = result as {banner : IAddBanner.Result[], total : number};

            await Promise.all(banner.map(async (banner) => {
                if (banner?.imageUrl) {
                    const publicBannerUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!, banner?.imageUrl);
                    banner.imageUrl = publicBannerUrl;
                }
            }));

            const totalPages = Math.ceil(total / filter.limit);
            const meta = {
                page: filter.page,
                limit: filter.limit,
                totalPages,
                total
            }
            res.status(StatusCode.SUCCESS).json(
                createResponse(
                    StatusCode.SUCCESS,
                    {banner,meta},
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