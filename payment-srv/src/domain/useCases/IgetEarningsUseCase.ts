import { PTobe } from "../../_lib/constants/Tobe";

export interface IgetEarningsUseCase {
    execute(userId: string, role: string): Promise<PTobe>;
}