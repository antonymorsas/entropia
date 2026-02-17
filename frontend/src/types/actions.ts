import { AppError } from "./errors";

export type ActionResult<T> =
    | {
        success: true;
        data: T;
    }
    | {
        success: false;
        error: AppError;
        fieldErrors?: Record<string, string[]>;
    };
