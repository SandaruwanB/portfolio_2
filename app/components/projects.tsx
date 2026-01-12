import React from 'react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Android Mobile Applications",
      description: "Native Android apps with modern UI/UX and robust backend integrations.",
      technologies: ["Java", "Kotlin", "Android SDK", "REST APIs"]
    },
    {
      id: 2, 
      title: "Odoo ERP Solutions",
      description: "Custom Odoo modules and integrations for business process automation.",
      technologies: ["Python", "Odoo", "PostgreSQL", "XML"]
    },
    {
      id: 3,
      title: "API Development & Integration",
      description: "RESTful APIs and third-party service integrations for scalable applications.",
      technologies: ["Node.js", "Python", "REST", "GraphQL"]
    }
  ];

  return (
    <section className='absolute top-0 left-0 w-full p-8' aria-labelledby="projects-heading">
      <h2 id="projects-heading" className='text-2xl font-bold mb-6 text-center'>Featured Projects & Expertise</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
        {projects.map((project) => (
          <article 
            key={project.id} 
            className='bg-white/5 dark:bg-white/10 backdrop-blur-md rounded-lg p-6 hover:bg-white/10 dark:hover:bg-white/20 transition-colors duration-300'
            itemScope 
            itemType="https://schema.org/SoftwareApplication"
          >
            <h3 className='text-xl font-semibold mb-3' itemProp="name">{project.title}</h3>
            <p className='text-gray-600 dark:text-gray-300 mb-4' itemProp="description">{project.description}</p>
            <div className='flex flex-wrap gap-2'>
              {project.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className='px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm'
                  itemProp="programmingLanguage"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects