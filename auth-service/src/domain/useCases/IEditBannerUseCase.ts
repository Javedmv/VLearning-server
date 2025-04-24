import { TOBE } from "../../_lib/utils/Tobe";
import { IAddBanner } from "../entities/BannerEntity";

export interface IEditBannerUseCase {
    execute(data: TOBE):Promise<string | null>
}