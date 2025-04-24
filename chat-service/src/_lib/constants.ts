export enum StatusCode {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export const Messages = {
    SUCCESS: "Request processed successfully",
    BAD_REQUEST: "Invalid request data",
    UNAUTHORIZED: "User is not authorized",
    NOT_FOUND: "Resource not found",
    INTERNAL_SERVER_ERROR: "Something went wrong, please try again later",
};

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export const createResponse = <T>(
    status: StatusCode,
    data?: T,
    message?: string
): ApiResponse<T> => ({
    success: status === StatusCode.SUCCESS,
    message: message || Messages.SUCCESS,
    data,
});

export type ITOBE = any;