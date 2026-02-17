"use client";

import { useForm } from "react-hook-form";
import { useAction } from "@/hooks/useAction";
import { createWindow } from "@/app/actions/window";
import { Upload, Loader2, Image as ImageIcon, X } from "lucide-react";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface FormData {
    file: FileList;
}

export default function PostWindow() {
    const {
        register,
        handleSubmit,
        reset: resetForm,
        watch,
        setValue,
        formState: { errors },
    } = useForm<FormData>();
    const [preview, setPreview] = useState<string | null>(null);

    const { execute, isLoading, error } = useAction({
        onSuccess: () => {
            resetForm();
            setPreview(null);
        },
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    const clearPreview = () => {
        setPreview(null);
        setValue("file", null as any);
    };

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();
        if (data.file && data.file[0]) {
            formData.append("file", data.file[0]);
            await execute(() => createWindow(formData));
        }
    };

    const fileRest = register("file", {
        required: "Por favor selecciona una imagen",
        onChange: handleFileChange
    });


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border-b border-gray-200 bg-white"
        >
            <div className="flex flex-col gap-4">
                {!preview ? (
                    <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-8 hover:bg-gray-50 transition-colors text-center cursor-pointer group">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            {...fileRest}
                            disabled={isLoading}
                        />
                        <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-blue-500 transition-colors">
                            <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium">
                                Haz clic o arrastra una foto aquí
                            </p>
                            <p className="text-xs text-gray-400">PNG, JPG hasta 5MB</p>
                        </div>
                    </div>
                ) : (
                    // Preview State
                    <div className="relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200 aspect-video group">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={clearPreview}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
                            disabled={isLoading}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {errors.file && (
                    <p className="text-red-500 text-sm">{errors.file.message}</p>
                )}

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-100">
                        {error.message}
                    </div>
                )}

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={!preview}
                        isLoading={isLoading}
                        variant="primary"
                    >
                        {isLoading ? "Subiendo..." : (
                            <>
                                <Upload className="w-4 h-4" />
                                Publicar Ventana
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </form>
    );
}
