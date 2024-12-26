import { UserEntity } from "../../domain/entities";

export interface IRepositories {
    create: (data: any) => Promise<UserEntity | null>;
    findByEmail: (email: string) => Promise<UserEntity | null>;
    verifyOtp: (email: string, otp : string) => Promise<Boolean | null>;
    findById: (id: string) => Promise<UserEntity | null>;
    addUserForm: (data: UserEntity) => Promise<UserEntity | null>;
    getStudentUser: () => Promise<UserEntity[] | null>;
    blockUser: (id:string, block: string) => Promise<UserEntity | null>;
    getInstructorUser: () => Promise<UserEntity[] | null>;
    updateIsVerified: (id:string, verify:string) => Promise<UserEntity | null>;
    updatePassword: (email:string, password:string) => Promise<UserEntity | null>;
    updateProfile: (userId:string, data:UserEntity) => Promise<UserEntity | null>;
    updateReapply: (args: string[]) => Promise<UserEntity | null>;
}