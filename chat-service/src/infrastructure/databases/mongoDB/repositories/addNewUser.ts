import { User } from '../models/index';

export const addNewUser = async (data: any) => {
    try {
        // Extract userId and validate
        console.log(data,"in chat srv")
        
        const userId = data[0]?._id;

        if (!userId) {
            throw new Error("User ID (_id) is required.");
        }

        // Check if the user already exists
        const existingUser = await User.findById(userId);

        if (existingUser) {
            // Prepare fields to update
            const updateData: any = {};

            if (data[0].username) updateData.username = data[0].username;
            if (data[0].firstName) updateData.firstName = data[0].firstName;
            if (data[0].lastName) updateData.lastName = data[0].lastName;
            if (data[0].email) updateData.email = data[0].email;
            if (data[0].password) updateData.password = data[0].password;
            if (data[0].role) updateData.role = data[0].role;

            if (data[0].profile) {
                updateData.profile = {};
                if (data[0].profile.avatar) updateData.profile.avatar = data[0].profile.avatar;
                if (data[0].profile.dob) updateData.profile.dob = data[0].profile.dob;
                if (data[0].profile.gender) updateData.profile.gender = data[0].profile.gender;
            }

            if (data[0].contact) {
                updateData.contact = {};
                if (data[0].contact.additionalEmail) updateData.contact.additionalEmail = data[0].contact.additionalEmail;
                if (data[0].contact.socialMedia) {
                    updateData.contact.socialMedia = {};
                    if (data[0].contact.socialMedia.instagram) updateData.contact.socialMedia.instagram = data[0].contact.socialMedia.instagram;
                    if (data[0].contact.socialMedia.linkedIn) updateData.contact.socialMedia.linkedIn = data[0].contact.socialMedia.linkedIn;
                    if (data[0].contact.socialMedia.github) updateData.contact.socialMedia.github = data[0].contact.socialMedia.github;
                }
            }

            if (data[0].phoneNumber) updateData.phoneNumber = data[0].phoneNumber;
            if (data[0].isBlocked !== undefined) updateData.isBlocked = data[0].isBlocked;
            if (data[0].isVerified) updateData.isVerified = data[0].isVerified;
            if (data[0].profession) updateData.profession = data[0].profession;
            if (data[0].profit !== undefined) updateData.profit = data[0].profit;
            if (data[0].cv) updateData.cv = data[0].cv;
            if (data[0].isNewUser !== undefined) updateData.isNewUser = data[0].isNewUser;
            if (data[0].qualification) updateData.qualification = data[0].qualification;
            if (data[0].profileDescription) updateData.profileDescription = data[0].profileDescription;

            // Update the user
            await User.findByIdAndUpdate(userId, updateData, { new: true });
            console.log(`User with _id ${userId} updated.`);
        } else {
            // Handle new user creation (same as before)
            const newUserData: any = { _id: data[0]._id };

            if (data[0].username) newUserData.username = data[0].username;
            if (data[0].firstName) newUserData.firstName = data[0].firstName;
            if (data[0].lastName) newUserData.lastName = data[0].lastName;
            if (data[0].email) newUserData.email = data[0].email;
            if (data[0].password) newUserData.password = data[0].password;
            if (data[0].role) newUserData.role = data[0].role;

            if (data[0].profile) {
                newUserData.profile = {};
                if (data[0].profile.avatar) newUserData.profile.avatar = data[0].profile.avatar;
                if (data[0].profile.dob) newUserData.profile.dob = data[0].profile.dob;
                if (data[0].profile.gender) newUserData.profile.gender = data[0].profile.gender;
            }

            if (data[0].contact) {
                newUserData.contact = {};
                if (data[0].contact.additionalEmail) newUserData.contact.additionalEmail = data[0].contact.additionalEmail;
                if (data[0].contact.socialMedia) {
                    newUserData.contact.socialMedia = {};
                    if (data[0].contact.socialMedia.instagram) newUserData.contact.socialMedia.instagram = data[0].contact.socialMedia.instagram;
                    if (data[0].contact.socialMedia.linkedIn) newUserData.contact.socialMedia.linkedIn = data[0].contact.socialMedia.linkedIn;
                    if (data[0].contact.socialMedia.github) newUserData.contact.socialMedia.github = data[0].contact.socialMedia.github;
                }
            }

            if (data[0].phoneNumber) newUserData.phoneNumber = data[0].phoneNumber;
            if (data[0].isBlocked !== undefined) newUserData.isBlocked = data[0].isBlocked;
            if (data[0].isVerified) newUserData.isVerified = data[0].isVerified;
            if (data[0].profession) newUserData.profession = data[0].profession;
            if (data[0].profit !== undefined) newUserData.profit = data[0].profit;
            if (data[0].cv) newUserData.cv = data[0].cv;
            if (data[0].isNewUser !== undefined) newUserData.isNewUser = data[0].isNewUser;
            if (data[0].qualification) newUserData.qualification = data[0].qualification;
            if (data[0].profileDescription) newUserData.profileDescription = data[0].profileDescription;

            const newUser = new User(newUserData);
            await newUser.save();
            console.log(`New user with _id ${userId} created.`);
        }
    } catch (error: any) {
        console.error("ERROR IN addNewUser REPOSITORY:", error.message);
    }
};
