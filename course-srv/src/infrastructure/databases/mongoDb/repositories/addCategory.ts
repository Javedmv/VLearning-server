import { CategoryEntity } from "../../../../domain/entities";
import { CategoryModel } from "../models";

export const addCategory = async (category: CategoryEntity): Promise<CategoryEntity | null> => {
    try {
        // Attempt to find and update the category, or insert it if it doesn't exist
        const existingCategory = await CategoryModel.findOne({ name: category.name });
        
        if (existingCategory) {
            throw new Error("Category already exists.")
        }

        // Create a new category
        const categoryData = await CategoryModel.create(category);
        if (!categoryData) {
            throw new Error("Category creation failed");
        }

        console.log(categoryData,"repo");
        return categoryData;
    } catch (error) {
        console.log(error);
        return null;
    }
}