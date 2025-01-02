import * as repositories from "../infrastructure/databases/mongoDB/repositories";
import * as useCases from "../application/useCases";
import { IDependencies } from "../application/interfaces/IDependencies";


export const dependencies: IDependencies = {
    repositories,
    useCases
}
