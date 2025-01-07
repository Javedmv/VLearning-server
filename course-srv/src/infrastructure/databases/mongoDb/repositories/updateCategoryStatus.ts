import { CategoryModel } from "../models";

export const updateCategoryStatus = async (catId:string, status:Boolean) : Promise<Boolean | null> => {
    try {
        if (!catId || status === undefined) {
            console.log('Missing required parameters:', { catId, status });
            return null;
        }
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            catId,
            {status},
            {new:true}
        )

        if (!updatedCategory) {
            console.log('Category not found:', catId);
            return false;
        }
        return true;
    } catch (error) {
        console.log(error,"error in category status update repo");
        return null
    }
}