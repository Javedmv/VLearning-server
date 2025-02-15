import { IAddBanner } from "../entities/BannerEntity";

export interface IEditBannerUseCase {
    execute(data: any):Promise<string | null>
}