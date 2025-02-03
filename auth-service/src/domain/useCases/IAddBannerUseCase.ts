import { IAddBanner } from "../entities/BannerEntity";

export interface IAddBannerUseCase {
    execute: (data: IAddBanner.Params) => Promise<IAddBanner.Result>;
}
