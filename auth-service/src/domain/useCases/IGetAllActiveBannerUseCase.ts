import { TOBE } from "../../_lib/utils/Tobe";
import { IAddBanner } from "../entities/BannerEntity";

export interface IGetAllActiveBannerUseCase {
    execute(): Promise<TOBE>
}