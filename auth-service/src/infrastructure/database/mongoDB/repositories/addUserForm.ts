import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const addUserForm = async (data:any): Promise<UserEntity | null> => {
    try {
        const { 
            email, 
            firstName, 
            lastName, 
            phoneNumber, 
            profile, 
            isNewUser, 
            avatarPath,
            cvPath,
            profession,
            profileDescription,

        } = data;

        const updatedData = {
            firstName,
            lastName,
            phoneNumber,
            profile: {
                dob: profile?.dob,
                gender: profile?.gender,
                avatar: avatarPath,
            },
            isNewUser,
            cv: cvPath,
            profession,
            profileDescription
        };

        const result = await User.findOneAndUpdate(
            { email },
            { $set: updatedData },
            { new: true } // Return the updated document
        );
        return result;
    } catch (error) {
        throw new Error("Userdata add failed")
    }
}