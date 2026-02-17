export default function WindowSkeleton() {
    return (
        <div className="border-b border-gray-200 bg-white animate-pulse">
            {/* Header Skeleton */}
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-32 bg-gray-200 rounded" />
                        <div className="h-3 w-24 bg-gray-200 rounded" />
                    </div>
                </div>
            </div>

            {/* Description Skeleton */}
            <div className="px-4 pb-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
            </div>

            {/* Image Skeleton */}
            <div className="relative aspect-square w-full bg-gray-200" />

            {/* Footer/Tags Skeleton */}
            <div className="p-4">
                <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-16 bg-gray-200 rounded-full" />
                    <div className="h-6 w-20 bg-gray-200 rounded-full" />
                    <div className="h-6 w-14 bg-gray-200 rounded-full" />
                    <div className="h-6 w-18 bg-gray-200 rounded-full" />
                </div>
            </div>
        </div>
    );
}
