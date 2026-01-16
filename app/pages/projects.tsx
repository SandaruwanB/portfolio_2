"use client";

import React from 'react';
import ProjectCard from '../components/ProjectCard';
import WindowContainer from '../components/WindowContainer';

interface ProjectsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ isOpen, onClose }) => {
  return (
    <WindowContainer 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Projects - Portfolio"
      loadingText="Loading projects..."
    >
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">
          My Projects
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          A collection of my recent work and personal projects
        </p>
      </div>

      <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[
          {
            title: "E-Commerce Platform",
            description: "A full-stack e-commerce solution built with Next.js and Stripe integration.",
            tech: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
            status: "Completed" as const
          },
          {
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates.",
            tech: ["React", "Node.js", "Socket.io", "MongoDB"],
            status: "In Progress" as const
          },
          {
            title: "Portfolio Website",
            description: "Personal portfolio website with Ubuntu desktop-like interface.",
            tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
            status: "Completed" as const
          },
          {
            title: "Weather Dashboard",
            description: "Real-time weather monitoring dashboard with location-based forecasts.",
            tech: ["Vue.js", "Chart.js", "OpenWeather API"],
            status: "Completed" as const
          },
          {
            title: "Chat Application",
            description: "Real-time messaging application with group chat functionality.",
            tech: ["React", "Firebase", "Material-UI"],
            status: "In Progress" as const
          },
          {
            title: "Blog Platform",
            description: "A modern blogging platform with markdown support and SEO optimization.",
            tech: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
            status: "Planning" as const
          }
        ].map((project, index) => (
          <ProjectCard 
            key={index}
            title={project.title}
            description={project.description}
            tech={project.tech}
            status={project.status}
            index={index}
          />
        ))}
      </div>
    </WindowContainer>
  );
};

export default Projects;