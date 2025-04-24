import { TOBE } from "../../../../_lib/utils/Tobe";
import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const updateProfile = async (userId: string, data: UserEntity): Promise<UserEntity | null> => {
  try {
    // Fetch the existing user document
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      throw new Error("User not found");
    }

    const updatedData: TOBE = {
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.phoneNumber && { phoneNumber: data.phoneNumber }),
      ...(data.profession && { profession: data.profession }),
      ...(data.profileDescription && { profileDescription: data.profileDescription }),
      ...(data.qualification && { qualification: data.qualification }),
    };

    // Handle nested profile object
    if (data.profile) {
      updatedData.profile = {
        ...existingUser.profile, 
        ...(data.profile.dob && { dob: data.profile.dob }),
        ...(data.profile.gender && { gender: data.profile.gender }),
      };
    }

    // Handle nested contact object
    if (data.contact) {
      updatedData.contact = {
        ...existingUser.contact,
        ...(data.contact.additionalEmail && { additionalEmail: data.contact.additionalEmail }),
      };

      if (data.contact.socialMedia) {
        updatedData.contact.socialMedia = {
          ...existingUser.contact?.socialMedia,
          ...(data.contact.socialMedia.instagram && { instagram: data.contact.socialMedia.instagram }),
          ...(data.contact.socialMedia.linkedIn && { linkedIn: data.contact.socialMedia.linkedIn }),
          ...(data.contact.socialMedia.github && { github: data.contact.socialMedia.github }),
        };
      }
    }

    const result = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      { new: true }
    );

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error("An unexpected error occurred");
    }
}

};
