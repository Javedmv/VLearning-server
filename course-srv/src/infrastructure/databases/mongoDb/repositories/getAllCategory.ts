import { CategoryEntity } from "../../../../domain/entities";
import { CategoryModel } from "../models";

export const getAllCategory = async (): Promise<CategoryEntity[] | null> => {
    try {
        // Attempt to find and update the category, or insert it if it doesn't exist
        const categorys = await CategoryModel.find({}).sort({ createdAt: -1 });
        return categorys;
    } catch (error) {
        console.log(error,"error in category get repo");
        return null;
    }
}