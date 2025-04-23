import { hashPassword } from "../../../../_lib/bcrypt";
import { UserEntity } from "../../../../domain/entities";
import { User } from "../models";

export const createGAuthUser = async (data: { email: string; name: string }) => {
    try {
        const { email, name } = data;
        
        // Check if user already exists with the given email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return existingUser as UserEntity;
        }

        // Create new user if no existing user is found
        const pWord = await hashPassword("123456");
        const user = {
            email,
            username: name,
            password: pWord,
            role: "student",
            isBlocked: false,
            isVerified: "false",
            isNewUser: true,
            profit: 0,
        };

        const newUser = await User.create(user);
        return newUser as UserEntity;
    } catch (error: any) {
        throw new Error(error?.message || "Google Auth user creation failed");
    }
}