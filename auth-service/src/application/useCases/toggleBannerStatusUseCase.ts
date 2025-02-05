import { IDependencies } from "../interfaces/IDependencies";

export const toggleBannerStatusUseCase = (dependencies:IDependencies) => {
    const {repositories: { toggleBannerStatus } } = dependencies;

    return {
        execute: async (id:string,status:boolean) => {
            try {
                return await toggleBannerStatus(id,status)
            } catch (error:any) {
                throw new Error(error.message)
            }
        }
    }
}