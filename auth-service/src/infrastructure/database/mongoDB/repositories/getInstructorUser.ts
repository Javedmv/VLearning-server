import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const getInstructorUser = async():Promise<UserEntity[] | null> => {
    try {
        const instructorUser = await User.find({ role: "instructor" })
        .sort({ createdAt: -1 })
        .select('firstName lastName profession isBlocked email profile.avatar profile.dob profile.gender isVerified cv phoneNumber profileDescription _id username');       

        console.log(instructorUser, "instructor user in repository")
        return instructorUser;
        
    } catch (error:any) {
        throw new Error(error?.message)
    }
}