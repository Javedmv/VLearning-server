import { ErrorResponse } from "../../../../_lib/error";
import { CategoryEntity } from "../../../../domain/entities";
import { CategoryModel } from "../models";

export const deleteCategory = async (catId: string): Promise<CategoryEntity> => {
    try {
        if (!catId?.trim()) {
            throw ErrorResponse.badRequest("Category ID is required");
        }

        const deletedCategory = await CategoryModel.findByIdAndDelete(catId);

        if (!deletedCategory) {
            throw ErrorResponse.notFound("Category not found");
        }

        return deletedCategory;

    } catch (error) {
        console.error({
            timestamp: new Date().toISOString(),
            action: "DELETE_CATEGORY_ERROR",
            user: "Javedmv",
            categoryId: catId,
            error: error instanceof Error ? error.message : 'Unknown error'
        });

        if (error instanceof ErrorResponse) {
            throw error;
        }

        throw ErrorResponse.internalError("Failed to delete category");
    }
}