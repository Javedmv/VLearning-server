import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

const getUser = async(userId: string)=> {
    try {
        const studentUser = await User.find({ _id: userId })
        return studentUser;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
    
}

export default getUser;