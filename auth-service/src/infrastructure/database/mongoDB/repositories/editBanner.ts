import { TOBE } from "../../../../_lib/utils/Tobe";
import { BannerModel } from "../models/BannerSchema";

export const editBanner = async (data: TOBE): Promise<string> => {
    try {
        console.log(data, "inside the edit banner repo");

        const { _id, title, status, type, description, priority, imageUrl } = data;
        console.log(imageUrl, "here in the repo")

        // Find the existing banner
        const existingBanner = await BannerModel.findById(_id);
        if (!existingBanner) {
            throw new Error("Banner not found");
        }

        let oldImage = ""; // Default return value

        // If a new image URL is provided, store the old image URL to be deleted
        if (imageUrl && imageUrl.trim() !== "") {
            oldImage = existingBanner.imageUrl;
        }

        // Prepare update fields (only update imageUrl if provided)
        const updateFields: TOBE = {
            title: title ?? existingBanner.title,
            status: status ?? existingBanner.status,
            type: type ?? existingBanner.type,
            description: description ?? existingBanner.description,
            priority: priority ?? existingBanner.priority
        };

        if (imageUrl && imageUrl.trim() !== "") {
            updateFields.imageUrl = imageUrl;
        }

        // Update banner
        const updatedBanner = await BannerModel.findByIdAndUpdate(
            _id,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedBanner) {
            throw new Error("Failed to update banner");
        }

        console.log("Updated banner:", updatedBanner ,"------");

        return oldImage; // Return old image URL if updated, else return ""

    } catch (error) {
        console.error("Error updating banner:", error);
        throw error;
    }
};
