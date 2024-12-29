import * as repositories from "../infrastructure/databases/mongoDB/repositories"; //correct the export dummy added
import * as useCases from "../application/useCases";  // correct the export dummy added
import { IDependencies } from "../application/interfaces/IDependencies";


export const dependencies: IDependencies = {
    repositories,
    useCases
}
