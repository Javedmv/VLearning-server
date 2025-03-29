import { User } from "../models";

export const getLandingPageInstructors = async () => {
    try {
        return await User.find({role:"instructor"});
    } catch (error) {
        throw new Error("Error in getLandingPageInstructors repo");
    }
}