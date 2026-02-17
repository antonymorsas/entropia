import { AppWindow } from "lucide-react";

interface EmptyStateProps {
    title?: string;
    description?: string;
}

export default function EmptyState({
    title = "No hay ventanas aún",
    description = "Sé el primero en compartir lo que ves a través de tu ventana.",
}: EmptyStateProps) {
    return (
        <div className="mx-auto max-w-xl w-full p-8 text-center border-b border-gray-100 bg-white min-h-[300px] flex flex-col items-center justify-center">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
                <AppWindow className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">{description}</p>
        </div>
    );
}
