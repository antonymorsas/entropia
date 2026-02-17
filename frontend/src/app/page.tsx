import Feed from "@/components/shared/Feed";
import { WindowProps } from "@/components/shared/WindowCard";

const mockWindows: WindowProps[] = [
  {
    id: "0aca281f-6141-4cf6-9db7-45e9c86f58d0",
    hash: "3e8388968b0b016e1465f0e1201fdb687f439cf0494509396f9fc1fc3ae7d6f4",
    isDuplicate: false,
    createdAt: "2026-02-17T21:04:14.103992",
    ai: {
      description: "A beautiful sunset view from an office window, capturing the warm hues of the evening sky.",
      structured_data: {
        daytime: "day",
        location: "interior",
        type: "fixed",
        material: "aluminum",
        panes: 1,
        covering: "blinds",
        openState: "closed"
      }
    },
    imageUrl: "https://picsum.photos/seed/window1/800/600"
  },
  {
    id: "1aca281f-6141-4cf6-9db7-45e9c86f58d1",
    hash: "4e8388968b0b016e1465f0e1201fdb687f439cf0494509396f9fc1fc3ae7d6f5",
    isDuplicate: false,
    createdAt: "2026-02-17T20:00:00.000000",
    ai: {
      description: "City lights at night with a laptop in the foreground.",
      structured_data: {
        daytime: "night",
        location: "interior",
        type: "sliding",
        material: "pvc",
        panes: 2,
        covering: "none",
        openState: "closed"
      }
    },
    imageUrl: "https://picsum.photos/seed/window2/800/600"
  },
  {
    id: "2aca281f-6141-4cf6-9db7-45e9c86f58d2",
    hash: "5e8388968b0b016e1465f0e1201fdb687f439cf0494509396f9fc1fc3ae7d6f6",
    isDuplicate: false,
    createdAt: "2026-02-17T18:30:00.000000",
    ai: {
      description: "Rainy day reading nook by the window.",
      structured_data: {
        daytime: "day",
        location: "interior",
        type: "casement",
        material: "wood",
        panes: 1,
        covering: "curtains",
        openState: "closed"
      }
    },
    imageUrl: "https://picsum.photos/seed/window3/800/600"
  },
  {
    id: "3aca281f-6141-4cf6-9db7-45e9c86f58d3",
    hash: "3e8388968b0b016e1465f0e1201fdb687f439cf0494509396f9fc1fc3ae7d6f4", // Same hash as first one
    isDuplicate: true,
    createdAt: "2026-02-17T21:05:00.000000",
    ai: {
      description: "Another angle of the office sunset.",
      structured_data: {
        daytime: "day",
        location: "interior",
        type: "fixed",
        material: "aluminum",
        panes: 1,
        covering: "blinds",
        openState: "closed"
      }
    },
    imageUrl: "https://picsum.photos/seed/window1/800/600"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Ventan Social
          </h1>
        </div>
      </div>

      <Feed windows={mockWindows} />
    </main>
  );
}
