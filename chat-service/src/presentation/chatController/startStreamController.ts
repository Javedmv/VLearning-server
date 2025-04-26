import { Request, Response, NextFunction } from 'express';
import { IDependencies } from '../../application/interfaces/IDependencies';

// UserPayload is declared globally in jwtMiddleware.ts, so we can use req.user directly

export const startStreamController = (dependencies: IDependencies) => {
    const { useCases: { startStreamUseCase } } = dependencies;

    // Get the actual execution function from the builder
    const startStreamExecuteFn = startStreamUseCase(dependencies);

    // Explicitly type the return as Promise<void> for Express compatibility
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { chatId } = req.body;
            // Access user info from the globally declared req.user
            const instructorId = req.user?._id;
            const userRole = req.user?.role;

            if (!chatId) {
                res.status(400).json({ success: false, message: 'Chat ID is required' });
                // Don't return here, let execution end implicitly
                return;
            }

            if (!instructorId || !userRole) {
                res.status(401).json({ success: false, message: 'Authentication required' });
                // Don't return here, let execution end implicitly
                return;
            }
            
            if (userRole !== 'instructor') {
                res.status(403).json({ success: false, message: 'Forbidden: Only instructors can start streams' });
                // Don't return here, let execution end implicitly
                return;
            }

            console.log(`Controller: Received start stream request for chat ${chatId} by instructor ${instructorId}`);

            // Call the execution function directly
            const result = await startStreamExecuteFn(chatId, instructorId);

            console.log(`Controller: Stream started successfully for chat ${chatId}`);

            res.status(200).json({
                success: true,
                data: result,
                message: 'Stream started successfully'
            });
            // Execution ends here implicitly returning void

        } catch (error: any) {
            console.error("Error in startStreamController:", error.message);
            next(error);
        }
    };
}; 