import { IAddBanner } from "../entities/BannerEntity";

export interface IGetAllActiveBannerUseCase {
    execute(): Promise<any>
}