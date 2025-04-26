import { Request, Response, NextFunction } from 'express';
import { IDependencies } from '../../application/interfaces/IDependencies';
import { Types } from 'mongoose';

export const stopStreamController = (dependencies: IDependencies) => {
    const { useCases: { stopStreamUseCase } } = dependencies;

    // Get the actual execution function from the builder
    const stopStreamExecuteFn = stopStreamUseCase(dependencies);

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { chatId } = req.params;
            const instructorId = req.user?._id; // Get instructor ID from authenticated user

            if (!instructorId) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            // Basic validation for chatId
            if (!chatId || !Types.ObjectId.isValid(chatId)) {
                res.status(400).json({ success: false, message: 'Valid Chat ID is required in URL parameters' });
                return;
            }

            // Role check (should ideally be middleware)
            if (req.user?.role !== 'instructor') {
                 res.status(403).json({ success: false, message: 'Forbidden: Only instructors can stop streams' });
                 return;
            }

            console.log(`Controller: Received stop stream request for chat ${chatId} by instructor ${instructorId}`);

            // Call the execution function directly
            const result = await stopStreamExecuteFn(chatId, instructorId);

            console.log(`Controller: Stop stream process completed for chat ${chatId}. Success: ${result.success}`);

            res.status(200).json({
                success: result.success,
                message: result.success ? 'Stream stopped successfully' : 'Stream stop operation finished (check logs for details).'
                // Note: Even if Whereby deletion failed, we might return success if DB is cleaned.
            });

        } catch (error: any) {
            console.error("Error in stopStreamController:", error.message);
             // Handle specific errors like Forbidden or Not Found from use case
            if (error.message.startsWith("Forbidden")) {
                 res.status(403).json({ success: false, message: error.message });
            } else if (error.message === "Chat not found.") {
                res.status(404).json({ success: false, message: error.message });
            } else {
                // Pass other errors to central error handler
                next(error); // Pass to Express error handler
            }
        }
    };
}; 