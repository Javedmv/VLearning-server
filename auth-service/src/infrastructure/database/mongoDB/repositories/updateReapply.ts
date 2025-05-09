import { TOBE } from "../../../../_lib/utils/Tobe";
import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";
import { Types } from "mongoose";

export const updateReapply = async (args: string[]): Promise<UserEntity | null> => {
    try {
        if (!Types.ObjectId.isValid(args[0])) {
            throw new Error("Invalid user ID");
        }

        // Construct updatedData object conditionally
        const updatedData: TOBE = {
            isVerified: "requested",
            role: "instructor"
        };
        if (args[1]) updatedData.profession = args[1];
        if (args[2]) updatedData.profileDescription = args[2];
        if (args[3]) updatedData.cv = args[3];
        
        const result = await User.findByIdAndUpdate(
            args[0],
            { $set: updatedData }, 
            { new: true }
        );
        if (!result) {
            throw new Error("User not found");
        }
        
        return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
};