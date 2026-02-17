"use server";

import { revalidatePath } from "next/cache";
import { WindowProps } from "@/components/shared/WindowCard";
import { ActionResult } from "@/types/actions";

const API_URL = "http://backend:8000/api/windows/";

export async function getWindows(): Promise<WindowProps[]> {
    try {
        const res = await fetch(API_URL, {
            cache: "no-store",
        });

        if (!res.ok) {
            console.error("Failed to fetch windows:", res.status, res.statusText);
            return [];
        }

        return res.json();
    } catch (error) {
        console.error("Error fetching windows:", error);
        return [];
    }
}

export async function createWindow(data: FormData): Promise<ActionResult<WindowProps>> {
    try {
        const file = data.get("file");
        if (!file) {
            return {
                success: false,
                error: { message: "No se ha seleccionado ningún archivo." }
            };
        }

        const res = await fetch(API_URL, {
            method: "POST",
            body: data,
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            return {
                success: false,
                error: { message: errorData.detail || "Error al subir la ventana." }
            };
        }

        const newWindow = await res.json();
        revalidatePath("/");

        return {
            success: true,
            data: newWindow
        };

    } catch (error) {
        console.error("Error creating window:", error);
        return {
            success: false,
            error: { message: "Error de conexión con el servidor." }
        };
    }
}
