'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
  {
    title: 'AI Chat Application',
    description: 'Real-time chat application with AI-powered responses using OpenAI',
    stack: ['React', 'FastAPI', 'OpenAI', 'PostgreSQL'],
    github: 'https://github.com/optimistotaku/ai-chat',
    demo: 'https://ai-chat-demo.com',
    image: '/projects/ai-chat.png',
  },
  {
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory management',
    stack: ['Next.js', 'Python', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/optimistotaku/ecommerce',
    demo: 'https://ecommerce-demo.com',
    image: '/projects/ecommerce.png',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for real-time data visualization and analytics',
    stack: ['React', 'D3.js', 'Python', 'MongoDB'],
    github: 'https://github.com/optimistotaku/dashboard',
    demo: 'https://dashboard-demo.com',
    image: '/projects/dashboard.png',
  },
];

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-neon-purple">Featured</span>{' '}
            <span className="text-neon-cyan">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore some of my recent work showcasing my expertise in web development and AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-dark-card rounded-lg overflow-hidden glow-border group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-neon-purple">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-neon-purple/10 text-neon-purple rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-purple transition-colors"
                  >
                    <FaGithub className="text-xl" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors"
                  >
                    <FaExternalLinkAlt className="text-xl" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 