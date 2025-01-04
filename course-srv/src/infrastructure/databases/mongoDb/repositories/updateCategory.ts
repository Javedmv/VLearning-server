import { CategoryEntity, UpdateCategoryEntity } from "../../../../domain/entities";
import { CategoryModel } from "../models";

export const updateCategory = async (catId: string, category: UpdateCategoryEntity): Promise<CategoryEntity | null> => {
    try {
        if (!catId || !category) {
            console.log('Missing required parameters:', { catId, category });
            return null;
        }

        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            catId,
            { $set: category },
            { 
                new: true,
            }
        );

        if (!updatedCategory) {
            console.log('Category not found:', catId);
            return null;
        }

        console.log('Updated category:', updatedCategory);
        
        return updatedCategory as CategoryEntity;
    } catch (error) {
        console.error('Error updating category:', error);
        return null;
    }
}