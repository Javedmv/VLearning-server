import { ICreateUserUseCase, IFindUserByEmailUseCase, IFindUserByIdUseCase, ILoginUserUseCase, IVerifyOtpUseCase, 
    IFormSubmitByEmailUseCase, IGetAllStudentsUseCase, IBlockUserUseCase, IGetAllInstructorsUseCase,IVerifyInstructorUseCase,
    IUpdatePasswordUseCase, IUpdateProfileUseCase,IUpdateCvUseCase, IAddBannerUseCase,IGetAllBannerUseCase,IDeleteBannerUseCase,
    IToggleBannerStatusUseCase,IGetAllActiveBannerUseCase,
    IEditBannerUseCase} from "../../domain/useCases";

import { IDependencies } from "./IDependencies";

export interface IUseCases {
    createUserUseCase: (dependencies: IDependencies) => ICreateUserUseCase;
    findUserByEmailUseCase: (dependencies: IDependencies) => IFindUserByEmailUseCase;
    verifyOtpUseCase: (dependencies: IDependencies) => IVerifyOtpUseCase;
    loginUserUseCase: (dependencies: IDependencies) => ILoginUserUseCase;
    findUserByIdUseCase: (dependencies:IDependencies) => IFindUserByIdUseCase;
    formSubmitByEmailUseCase: (dependencies:IDependencies) => IFormSubmitByEmailUseCase;
    getAllStudentsUseCase:(dependencies:IDependencies) => IGetAllStudentsUseCase;
    blockUserUseCase:(dependencies:IDependencies) => IBlockUserUseCase;
    getAllInstructorsUseCase: (dependencies:IDependencies) => IGetAllInstructorsUseCase;
    verifyInstructorUseCase: (dependencies:IDependencies) => IVerifyInstructorUseCase;
    updatePasswordUseCase: (dependencies:IDependencies) => IUpdatePasswordUseCase;
    updateProfileUseCase: (dependencies:IDependencies) => IUpdateProfileUseCase;
    updateCvUseCase:(dependencies:IDependencies) => IUpdateCvUseCase;
    addBannerUseCase: (dependencies:IDependencies) => IAddBannerUseCase;
    getAllBannerUseCase: (dependencies:IDependencies) => IGetAllBannerUseCase;
    deleteBannerUseCase: (dependencies:IDependencies) => IDeleteBannerUseCase;
    toggleBannerStatusUseCase: (dependencies:IDependencies) => IToggleBannerStatusUseCase;
    getAllActiveBannerUseCase: (dependencies:IDependencies) => IGetAllActiveBannerUseCase;
    editBannerUseCase: (dependencies:IDependencies) => IEditBannerUseCase;
}