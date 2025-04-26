import { Request, Response, NextFunction } from 'express';
import { IDependencies } from '../../application/interfaces/IDependencies';
import { Types } from 'mongoose';

export const getStreamDetailsController = (dependencies: IDependencies) => {
    const { useCases: { getStreamDetailsUseCase } } = dependencies;

    // Get the actual execution function from the builder
    const getStreamDetailsExecuteFn = getStreamDetailsUseCase(dependencies);

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { chatId } = req.params;
            const userId = req.user?._id; // Get user ID from authenticated user

            if (!userId) {
                // Should be caught by jwtMiddleware
                res.status(401).json({ success: false, message: 'Authentication required' });
                return;
            }

            if (!chatId || !Types.ObjectId.isValid(chatId)) {
                res.status(400).json({ success: false, message: 'Valid Chat ID is required in URL parameters' });
                return;
            }

            console.log(`Controller: Received get stream details request for chat ${chatId} by user ${userId}`);

            // Call the execution function directly
            const result = await getStreamDetailsExecuteFn(chatId, userId);

            console.log(`Controller: Stream details fetched for chat ${chatId}. Active: ${result.isActive}`);

            res.status(200).json({
                success: true,
                data: result, // Contains { isActive, roomUrl?, meetingId? }
                message: result.isActive ? 'Active stream details retrieved' : 'No active stream found'
            });

        } catch (error: any) {
            console.error("Error in getStreamDetailsController:", error.message);
             // Handle specific errors like Forbidden from use case
            if (error.message.startsWith("Forbidden")) {
                 res.status(403).json({ success: false, message: error.message });
            } else {
                // Pass other errors to central error handler
                next(error);
            }
        }
    };
}; 