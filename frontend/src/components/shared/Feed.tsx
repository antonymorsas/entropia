import WindowCard, { WindowProps } from "./WindowCard";

interface FeedProps {
    windows: WindowProps[];
}

export default function Feed({ windows }: FeedProps) {
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
