import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const getUser = async(userId: string)=> {
    try {
        const studentUser = await User.find({ _id: userId })
        return studentUser;
    } catch (error:any) {
        throw new Error(error?.message)
    }
}