import Projects from "./components/projects"

export default function Home() {
  return (
    <main className="min-h-screen">
      <header className="sr-only">
        <h1>Sandaruwan Bandara - Senior Software Engineer Portfolio</h1>
      </header>
      
      <section aria-label="Projects showcase">
        <Projects />
      </section>
      
      <section className="text-lg text-center" aria-label="Personal introduction">
        <h2 className="text-2xl font-bold mb-2">Sandaruwan Bandara</h2>
        <p className="text-gray-600 dark:text-gray-400">Senior Software Engineer at Cygnus One</p>
        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Specializing in Android Development, API Integrations & Odoo ERP</p>
      </section>
      
      <nav className="absolute bottom-2 left-0 w-screen" aria-label="Main navigation">
        <div className="flex w-full justify-center items-center">
          <div className="px-5 py-2 bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-lg">
            <button 
              className="hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 rounded"
              aria-label="View my projects"
            >
              Open Projects
            </button>
          </div>
        </div>
      </nav>
    </main>
  );
}
