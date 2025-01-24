import { CourseEntity } from "../../../../domain/entities";
import { CourseFilters } from "../../../../domain/entities/CourseFilter";
import { CourseModel } from "../models/courseSchema";

export const getAllCourses = async (filters: CourseFilters): Promise<any> => {
    try {
        const { search, sortBy, categories, page, limit } = filters;

        const query: any = {};

        // Search
        if (search) {
            query["basicDetails.title"] = { $regex: search, $options: "i" };
        }

        // Categories
        if (categories) {
            query["basicDetails.category"] = { $in: categories.split(",") };
        }

        // Sorting
        let sort: any = {};
        if (sortBy === "relevance" || sortBy === "newest") {
            sort = { "metadata.createdAt": -1 }; // Default sorting
        } else if (sortBy === "priceLowToHigh") {
            sort = { "pricing.amount": 1 };
        } else if (sortBy === "priceHighToLow") {
            sort = { "pricing.amount": -1 };
        }

        // Pagination
        const skip = (page - 1) * limit;

        const total = await CourseModel.countDocuments(query);

        const courses = await CourseModel.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .populate("basicDetails.category")
            .populate("instructor");

        return { courses: courses as CourseEntity[], total };
    } catch (error) {
        console.log(error, "error in get all courses repo");
        return { courses: [], total: 0 };
    }
};
