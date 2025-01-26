import { User } from "../models";

export const getInstructorDetails = async (instrId: string) => {
  try {
    const instructorDetails = await User.findOne({ _id: instrId }); // Replace `Database.findOne` with your actual query

    if (!instructorDetails) {
      console.error(`Instructor with ID ${instrId} not found`);
      return null; // Return null if no instructor is found
    }
    return instructorDetails;
  } catch (error) {
    console.error(error, "Error in getInstructorDetails repository");
    return Promise.resolve(null); // Return null if an error occurs
  }
};
