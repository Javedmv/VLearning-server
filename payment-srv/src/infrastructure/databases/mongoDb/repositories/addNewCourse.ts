import { CourseModel } from "../models";

export const addNewCourse = async (data: any) => {
    try {
        const { _id, basicDetails, courseContent, pricing, metadata } = data;

        // Check if a course with the same _id and title already exists
        const existingCourse = await CourseModel.findOne({
            _id,
        });

        if (existingCourse) {
            // Update the existing course with new data, keeping nested _id fields intact
            await CourseModel.updateOne(
                { _id: existingCourse._id },
                {
                    $set: {
                        instructorId: data.instructorId,
                        instructor: data.instructor,
                        students: data.students,
                        basicDetails: { ...basicDetails }, // Retains `_id` within nested fields
                        courseContent: { ...courseContent }, // Retains `_id` within nested fields
                        pricing: { ...pricing }, // Retains `_id` within nested fields
                        metadata: {
                            ...metadata,
                            updatedBy: metadata.updatedBy,
                            updatedAt: metadata.updatedAt,
                        },
                    },
                },
                { overwrite: false } // Ensures no new fields are added
            );
            console.log(`Course updated successfully: ${existingCourse._id}`);
            return;
        } else {
            // Create a new course with the provided data, ensuring `_id` fields are preserved
            const newCourse = new CourseModel(data);
            await newCourse.save();
            console.log(`New course created successfully: ${newCourse._id}`);
            return;
        }
    } catch (error: any) {
        console.error("ERROR IN addNewCourse REPOSITORY:", error.message);
    }
};
