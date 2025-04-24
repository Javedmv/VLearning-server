import { TOBE } from "../../_lib/utils/Tobe";
import { UserEntity } from "../../domain/entities";
import { IAddBanner } from "../../domain/entities/BannerEntity";
import { CourseFilters } from "../../domain/entities/CourseFilter";
import { InstructorUserResult } from "../../infrastructure/database/mongoDB/repositories";
import { editBanner } from '../../infrastructure/database/mongoDB/repositories/editBanner';

export interface IRepositories {
    create: (data: TOBE) => Promise<UserEntity | null>;
    findByEmail: (email: string) => Promise<UserEntity | null>;
    verifyOtp: (email: string, otp : string) => Promise<Boolean | null>;
    findById: (id: string) => Promise<UserEntity | null>;
    addUserForm: (data: UserEntity) => Promise<UserEntity | null>;
    getStudentUser: (filters:CourseFilters) => Promise<TOBE>;
    blockUser: (id:string, block: string) => Promise<UserEntity | null>;
    getInstructorUser: (filters:CourseFilters) => Promise<TOBE>;
    updateIsVerified: (id:string, verify:string) => Promise<UserEntity | null>;
    updatePassword: (email:string, password:string) => Promise<UserEntity | null>;
    updateProfile: (userId:string, data:UserEntity) => Promise<UserEntity | null>;
    updateReapply: (args: string[]) => Promise<UserEntity | null>;
    addBanner: ({title, status, type, imageUrl ,description,priority}:IAddBanner.Params) => Promise<TOBE>;
    getAllBanner: () => Promise<IAddBanner.Result[] | null>;
    deleteBanner: (id:string) => Promise<IAddBanner.Result>;
    toggleBannerStatus: (id:string, status:boolean) => Promise<boolean>;
    getAllActiveBanner: () => Promise<IAddBanner.Result[]>
    editBanner: (data:TOBE) => Promise<string>
    createGAuthUser: (data: { email: string; name: string }) => Promise<UserEntity | null>;
}