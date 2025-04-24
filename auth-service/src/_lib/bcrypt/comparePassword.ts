import { compare } from "bcrypt"

export const comparePassword = async (original: string, encrypted: string): Promise<boolean> => {
    try {
        const match = await compare(original, encrypted);
        return match;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred during password comparison");
        }
    }
}
