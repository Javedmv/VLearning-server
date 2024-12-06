import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const getStudentUser = async():Promise<UserEntity[] | null> => {
    try {
        const studentUser = await User.find({ role: "student" })
        .sort({ createdAt: -1 }) 
        .select('firstName lastName profession isBlocked email profile.avatar _id username')    

        return studentUser;
        
    } catch (error:any) {
        throw new Error(error?.message)
    }
}