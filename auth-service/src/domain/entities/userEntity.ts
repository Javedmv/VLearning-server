import {ObjectId} from "mongoose";

enum Role {
    student = "student",
    instructor = "instructor",
    admin = "admin"
}

enum Gender {
    male = "male",
    female = "female"
}

interface SocialMedia {
    instagram?: string;
    linkedIn?: string;
    github?: string;
}

interface Contact {
    phone?: string;
    additionalEmail?: string;
    socialMedia?: string;
}

interface Profile {
    avatar?: string;
    dob?: Date;
    gender?: Gender;
}

export interface UserEntity {
    _id?: ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: Role;
    profile?: Profile;
    contact?: Contact;
    isBlocked: boolean;
    isVerified: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    profession?: string;
    isNewUser?: boolean;
}