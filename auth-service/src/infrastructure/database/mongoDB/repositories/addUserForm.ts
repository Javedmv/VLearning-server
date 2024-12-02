import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const addUserForm = async (data:UserEntity): Promise<UserEntity | null> => {
    try {
        // console.log(data, "data in respository")
        // const 
        // const updatedProfile = await User.updateOne(
        //     {email:data.email},
        //     {$set: {}}
        // )
        return null;
    } catch (error) {
        throw new Error("Userdata add failed")
    }
}

// const result = await Otp.updateOne(
//     {email: data.email},
//     {$set:{ otp: data.otp }},
//     {upsert:true , new : true}
// )