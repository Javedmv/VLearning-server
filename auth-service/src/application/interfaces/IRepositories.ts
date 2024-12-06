import { UserEntity } from "../../domain/entities";

export interface IRepositories {
    create: (data: UserEntity) => Promise<UserEntity | null>;
    findByEmail: (email: string) => Promise<UserEntity | null>;
    verifyOtp: (email: string, otp : string) => Promise<Boolean | null>
    findById: (id: string) => Promise<UserEntity | null>
    addUserForm: (data: UserEntity) => Promise<UserEntity | null>
    getStudentUser: () => Promise<UserEntity[] | null>
    blockUser: (id:string, block: string) => Promise<UserEntity | null>
    getInstructorUser: () => Promise<UserEntity[] | null>
    updateIsVerified: (id:string, verify:string) => Promise<UserEntity | null>
}