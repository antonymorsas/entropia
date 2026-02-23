import WindowSkeleton from "@/components/shared/WindowSkeleton";
import PostWindow from "@/components/shared/PostWindow";

export default function Loading() {
    return (
        <main className="min-h-screen bg-white">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-xl mx-auto px-4 py-3">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Ventana Social
                    </h1>
                </div>
            </div>

            <div className="max-w-xl mx-auto border-x border-gray-200">
                <PostWindow />
            </div>

            <div className="w-full max-w-xl mx-auto border-x border-gray-200 min-h-screen">
                {[...Array(3)].map((_, i) => (
                    <WindowSkeleton key={i} />
                ))}
            </div>
        </main>
    );
}
