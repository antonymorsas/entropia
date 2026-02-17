import { AppError } from "@/types/errors";

export function toError(maybeError: unknown): Error {
    if (maybeError instanceof Error) return maybeError;

    try {
        return new Error(JSON.stringify(maybeError));
    } catch {
        return new Error(String(maybeError));
    }
}

export function handleError(error: unknown): AppError {
    const err = toError(error);

    if ((error as AppError).message && (error as AppError).code) {
        return error as AppError;
    }

    return {
        message: err.message,
        code: "INTERNAL_SERVER_ERROR",
    };
}
