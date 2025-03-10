import { MessageEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const addNewMessageUseCase = (dependencies:IDependencies) => {
    const {repositories:{addNewMessage}} = dependencies
    return {
        execute:async (body:MessageEntity.Params) => {
            try {
                return await addNewMessage(body)
            } catch (error) {
                console.log("USECASE ERROR addNewMessageUseCase", error)
                throw new Error("something went wrong")
            }
        }
    }
}