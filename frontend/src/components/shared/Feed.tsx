import WindowCard, { WindowProps } from "./WindowCard";
import EmptyState from "./EmptyState";

interface FeedProps {
    windows: WindowProps[];
}

export default function Feed({ windows }: FeedProps) {
    if (!windows || windows.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="w-full max-w-xl mx-auto border-x border-gray-200 min-h-screen">
            {windows.map((w) => (
                <WindowCard
                    key={w.id}
                    window={w}
                />
            ))}
        </div>
    );
}
