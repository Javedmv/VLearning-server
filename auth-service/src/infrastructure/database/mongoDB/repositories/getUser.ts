import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

const getUser = async(userId: string)=> {
    try {
        const studentUser = await User.find({ _id: userId })
        return studentUser;
    } catch (error:any) {
        throw new Error(error?.message)
    }
}

export default getUser;