import { ErrorResponse } from "../../../../_lib/common/error";
import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const blockUser = async(id:string, block:string):Promise<UserEntity | null> => {
    try {
        const student = await User.findByIdAndUpdate(id,{$set:{isBlocked: block}})

        if (!student) {
            console.log('Student not found, "to block and unblock"');
            throw new Error("User does not exists to block!!")
        }

        return student;
    } catch (error:any) {
        throw new Error(error?.message)
    }
}