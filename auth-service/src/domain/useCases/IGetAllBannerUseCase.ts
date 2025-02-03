import { IAddBanner } from "../entities/BannerEntity";

export interface IGetAllBannerUseCase {
    execute(): Promise<IAddBanner.Result[]>
}