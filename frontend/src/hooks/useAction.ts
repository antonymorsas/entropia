"use client";

import { useState, useCallback } from "react";
import { ActionResult } from "@/types/actions";
import { AppError } from "@/types/errors";
import { handleError, toError } from "@/utils/errors/error-handler";

interface UseActionState<T> {
    data: T | null;
    error: AppError | null;
    isLoading: boolean;
    fieldErrors: Record<string, string[]>;
}

interface UseActionOptions<T> {
    onSuccess?: (data: T) => void;
    onError?: (error: AppError) => void;
    clearOnSuccess?: boolean;
    actionName?: string;
}

/**
 * Hook para manejar Server Actions de manera consistente
 */
export function useAction<T = unknown>(options: UseActionOptions<T> = {}) {
    const [state, setState] = useState<UseActionState<T>>({
        data: null,
        error: null,
        isLoading: false,
        fieldErrors: {},
    });

    const execute = useCallback(
        async (actionFn: () => Promise<ActionResult<T>>) => {
            setState((prev) => ({
                ...prev,
                isLoading: true,
                error: null,
                fieldErrors: {},
            }));

            try {
                const result = await actionFn();

                if (result.success) {
                    setState({
                        data: result.data,
                        error: null,
                        isLoading: false,
                        fieldErrors: {},
                    });

                    options.onSuccess?.(result.data);
                    if (options.clearOnSuccess)
                        setState({
                            data: null,
                            error: null,
                            isLoading: false,
                            fieldErrors: {},
                        });
                } else {
                    setState((prev) => ({
                        ...prev,
                        error: result.error,
                        isLoading: false,
                        fieldErrors: result.fieldErrors || {},
                    }));

                    options.onError?.(result.error);
                }

                return result;
            } catch (error) {
                const appError = handleError(toError(error));

                setState((prev) => ({
                    ...prev,
                    error: appError,
                    isLoading: false,
                    fieldErrors: {},
                }));

                options.onError?.(appError);

                return {
                    success: false as const,
                    error: appError,
                };
            }
        },
        [options]
    );

    const reset = useCallback(() => {
        setState({
            data: null,
            error: null,
            isLoading: false,
            fieldErrors: {},
        });
    }, []);

    const clearError = useCallback(() => {
        setState((prev) => ({
            ...prev,
            error: null,
            fieldErrors: {},
        }));
    }, []);

    return {
        ...state,
        execute,
        reset,
        clearError,
    };
}
