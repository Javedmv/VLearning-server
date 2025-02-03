import { IAddBanner } from "../entities/BannerEntity";

export interface IDeleteBannerUseCase {
    execute: (id: string) => Promise<IAddBanner.Result>;
}