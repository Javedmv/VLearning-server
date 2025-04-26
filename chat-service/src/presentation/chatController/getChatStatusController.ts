import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ErrorResponse } from "../../_lib/error";
import { createResponse, StatusCode } from "../../_lib/constants";
// Remove direct import of use case interface if the builder is used directly
// import { IgetChatStatusUseCase } from "../../domain/useCases/IgetChatStatusUseCase";

export const getChatStatusController = (dependencies: IDependencies) => {
    // Keep the use case builder function from dependencies
    const getChatStatusUseCaseBuilder = dependencies.useCases.getChatStatusUseCase;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Authentication check
            if (!req.user) {
                return next(ErrorResponse.unauthorized("Authentication required."));
            }

            const chatId = req.params.chatId;
            if (!chatId) {
                return next(ErrorResponse.badRequest("Chat ID parameter is required."));
            }

            // Build the use case instance *here* and call execute
            // This pattern is less common but accommodates the linter error
            const result = await getChatStatusUseCaseBuilder(dependencies).execute(chatId);

            // Handle case where chat is not found
            if (result === null) {
                return next(ErrorResponse.notFound("Chat not found."));
            }

            // Format and send success response
            const response = createResponse(StatusCode.SUCCESS, result);
            res.status(StatusCode.SUCCESS).json(response);

        } catch (error) {
            console.error("Error in getChatStatusController:", error);
            next(error); // Pass error to the central error handler
        }
    }
}