import Projects from "./components/projects"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Projects />
      <div className="text-lg text-center">Sandaruwan Bandara</div>
      <div className="absolute bottom-2 left-0 w-screen">
        <div className="flex w-full justify-center items-center">
          <div className="px-5 py-2 bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-lg">
            <button>Open Projects</button>
          </div>
        </div>
      </div>
    </div>
  );
}
