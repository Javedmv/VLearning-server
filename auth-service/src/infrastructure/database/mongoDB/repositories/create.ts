import { User } from "../models/User";
import { UserEntity } from "../../../../domain/entities";

export const create = async(data:UserEntity):Promise<UserEntity | null> => {
    try {
        const newUser = await User.create(data)

        if(!newUser){
            throw new Error("user creation failed")
        }

        return newUser;

    } catch (error) {
        throw new Error("User Creation Failed!!")
    }
}