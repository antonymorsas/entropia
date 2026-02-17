import Feed from "@/components/shared/Feed";
import { getWindows } from "@/app/actions/window";
import PostWindow from "@/components/shared/PostWindow";

export default async function Home() {
  const windows = await getWindows();

  return (
    <main className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-xl mx-auto px-4 py-3">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Ventan Social
          </h1>
        </div>
      </div>

      <div className="max-w-xl mx-auto border-x border-gray-200">
        <PostWindow />
      </div>

      <Feed windows={windows} />
    </main>
  );
}
