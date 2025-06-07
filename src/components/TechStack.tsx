'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as SiIcons from 'react-icons/si';

const techCategories = [
  {
    title: 'Frontend',
    icon: '🎨',
    technologies: [
      { name: 'TypeScript', iconName: 'SiTypescript', color: '#3178C6' },
      { name: 'React', iconName: 'SiReact', color: '#61DAFB' },
      { name: 'Next.js', iconName: 'SiNextdotjs', color: '#000000' },
      { name: 'Tailwind CSS', iconName: 'SiTailwindcss', color: '#06B6D4' },
      { name: 'D3.js', iconName: 'SiD3dotjs', color: '#F9A03C' },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    technologies: [
      { name: 'Python', iconName: 'SiPython', color: '#3776AB' },
      { name: 'FastAPI', iconName: 'SiFastapi', color: '#009688' },
      { name: 'PostgreSQL', iconName: 'SiPostgresql', color: '#336791' },
      { name: 'MongoDB', iconName: 'SiMongodb', color: '#47A248' },
      { name: 'Redis', iconName: 'SiRedis', color: '#DC382D' },
    ],
  },
  {
    title: 'AI/ML',
    icon: '🤖',
    technologies: [
      { name: 'OpenAI', iconName: 'SiOpenai', color: '#412991' },
      { name: 'TensorFlow', iconName: 'SiPython', color: '#FF6F00' },
      { name: 'PyTorch', iconName: 'SiPython', color: '#EE4C2C' },
    ],
  },
];

export default function TechStack() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="tech-stack" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-neon-purple">Tech</span>{' '}
            <span className="text-neon-cyan">Stack</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            The technologies I use to bring ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-dark-card p-6 rounded-lg glow-border"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h3 className="text-xl font-semibold text-neon-purple">
                  {category.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {category.technologies.map((tech, techIndex) => {
                  const Icon = SiIcons[tech.iconName as keyof typeof SiIcons];
                  return (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: categoryIndex * 0.2 + techIndex * 0.1,
                      }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-dark-bg/50 hover:bg-dark-bg transition-colors group"
                    >
                      {Icon && (
                        <Icon
                          className="text-2xl"
                          style={{ color: tech.color }}
                        />
                      )}
                      <span className="text-gray-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 