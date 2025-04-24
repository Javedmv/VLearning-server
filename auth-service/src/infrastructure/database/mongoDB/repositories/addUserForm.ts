import { TOBE } from "../../../../_lib/utils/Tobe";
import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const addUserForm = async (data:TOBE): Promise<UserEntity | null> => {
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
            qualification,
            contact
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
            profileDescription,
            contact: {
                additionalEmail: contact?.additionalEmail,
                socialMedia: {
                    instagram: contact?.socialMedia?.instagram,
                    linkedIn: contact?.socialMedia?.linkedIn,
                    github: contact?.socialMedia?.github,
                }
            },
            qualification
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