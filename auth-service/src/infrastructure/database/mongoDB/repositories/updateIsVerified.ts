import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const updateIsVerified = async(id:string ,verify:string): Promise<UserEntity | null > => {
    try {
        const instructor = await User.findOneAndUpdate(
            { _id: id },
            { isVerified: verify },
            { new: true }
          ).exec();
        return instructor;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}