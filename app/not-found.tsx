import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#08090d] dark:text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-4">
        <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
          404 // NOT FOUND
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">
          Page not found
        </h1>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          The requested system route does not exist.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

