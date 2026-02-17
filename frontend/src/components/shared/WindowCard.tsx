import Image from "next/image";

export interface WindowProps {
    id: string;
    hash: string;
    isDuplicate: boolean;
    createdAt: string;
    ai?: {
        description: string;
        structured_data: {
            daytime: "day" | "night" | "unknown";
            location: "interior" | "exterior" | "unknown";
            type: "fixed" | "sliding" | "casement" | "awning" | "hung" | "pivot" | "unknown";
            material: "wood" | "aluminum" | "pvc" | "unknown";
            panes: 1 | 2 | 3 | "unknown";
            covering: "curtains" | "blinds" | "none" | "unknown";
            openState: "open" | "closed" | "ajar" | "unknown";
        };
    } | null;
    imageUrl?: string | null;
}

export default function WindowCard({ window }: { window: WindowProps }) {
    const user = {
        name: "Anonymous Observer",
        handle: "anonymous",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + window.id,
    };

    const description = window.ai?.description || "No description available.";

    return (
        <article className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex gap-4">
                {/* Avatar Section */}
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image
                            src={user.avatar}
                            alt={user.name}
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1 text-sm overflow-hidden">
                            <span className="font-bold text-gray-900 truncate">
                                {user.name}
                            </span>
                            <span className="text-gray-500 truncate">
                                @{user.handle}
                            </span>
                            <span className="text-gray-500 text-xs">
                                · {new Date(window.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        {window.isDuplicate && (
                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full border border-amber-200 font-medium">
                                Duplicate
                            </span>
                        )}
                    </div>

                    {/* Text Content */}
                    <div className="mb-3">
                        <p className="text-gray-500 text-sm mt-1">
                            {description}
                        </p>

                        {/* Structured Data Tags */}
                        {window.ai?.structured_data && (
                            <div className="flex flex-wrap gap-2 mt-3">
                                {Object.entries(window.ai.structured_data)
                                    .filter(([_, value]) => value !== "unknown")
                                    .map(([key, value]) => (
                                        <span key={key} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded border border-blue-100 font-medium capitalize">
                                            {key}: {value}
                                        </span>
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Image Content */}
                    {window.imageUrl && (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 mb-2">
                            <Image
                                src={window.imageUrl.startsWith("http") ? window.imageUrl : `/${window.imageUrl}`}
                                alt={description}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}
