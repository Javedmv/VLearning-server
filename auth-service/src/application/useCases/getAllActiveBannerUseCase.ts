import { getPublicUrl } from "../../_lib/s3/s3bucket";
import { IDependencies } from "../interfaces/IDependencies";

export const getAllActiveBannerUseCase = (dependencies:IDependencies) => {
    const {repositories:{getAllActiveBanner}} = dependencies;

    return {
        execute:async () => {
            try {
                const result = await getAllActiveBanner();

                if (!result || result.length === 0) {
                    return 
                }
                await Promise.all(result.map(async (banner) => {
                    if (banner?.imageUrl) {
                        const publicBannerUrl = await getPublicUrl(process.env.S3_BUCKET_NAME!, banner?.imageUrl);
                        banner.imageUrl = publicBannerUrl;
                    }
                })); 

                const highPriority = result.filter(banner => banner.priority === 'high');
                const mediumPriority = result.filter(banner => banner.priority === 'medium');
                const lowPriority = result.filter(banner => banner.priority === 'low');
                return({ highPriority, mediumPriority, lowPriority });
            } catch (error) {
                console.log(error,"GET ALL ACTIVE BANNER USECASE")
            }
        }
    }
}