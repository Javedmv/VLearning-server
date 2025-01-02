import { CategoryEntity } from "../../../../domain/entities";

export const addCategory = async (category: CategoryEntity): Promise<CategoryEntity | null> => {
    try {
        console.log(category)
        return category;
    } catch (error) {
        console.log(error)
        return null;
    }
}