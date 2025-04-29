import { CategoryEntity } from "../../../../domain/entities";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { CategoryModel } from "../models";

export const getAllCategory = async (filters:CourseFilters): Promise<{categorys: CategoryEntity[];totalCategories: number;} | null> => {
    try {
        const {page, limit} = filters;
        const skip = (page - 1) * limit;
        const totalCategories = await CategoryModel.countDocuments({});
        const categorys = await CategoryModel.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit);
        return {
            categorys: categorys as CategoryEntity[],
            totalCategories: totalCategories as number
          };
          
        } catch (error) {
        console.log(error,"error in get all category repo");
        return null;
    }
}