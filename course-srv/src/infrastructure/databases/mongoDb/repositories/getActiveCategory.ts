import { CategoryEntity } from "../../../../domain/entities";
import { CategoryModel } from "../models";

export const getActiveCategory = async () : Promise<CategoryEntity[] | null> => {
    try {
        const category = await CategoryModel.find({status: true}).select('_id name').sort({ createdAt: -1 })
        return category;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error, "error in get active category repo");
        } else {
            console.log("Unknown error in get active category repo");
        }
        return null;
    }
    
}