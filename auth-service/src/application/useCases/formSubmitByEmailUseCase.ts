import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const formSubmitByEmailUseCase = (dependencies:IDependencies) => {
    const {repositories: {addUserForm}} = dependencies
    return {
        execute: async (data:UserEntity) => {
            return await addUserForm(data)
        }
    }
}