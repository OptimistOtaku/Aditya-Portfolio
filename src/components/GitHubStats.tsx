'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub } from 'react-icons/fa';

export default function GitHubStats() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="github-stats" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-neon-purple">GitHub</span>{' '}
            <span className="text-neon-cyan">Stats</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My coding journey in numbers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* GitHub Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-dark-card p-6 rounded-lg glow-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaGithub className="text-3xl text-neon-purple" />
              <h3 className="text-xl font-semibold text-neon-purple">
                GitHub Stats
              </h3>
            </div>
            <img
              src="https://github-readme-stats.vercel.app/api?username=optimistotaku&show_icons=true&theme=radical&hide_border=true"
              alt="GitHub Stats"
              className="w-full"
            />
          </motion.div>

          {/* GitHub Streak Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-dark-card p-6 rounded-lg glow-border"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaGithub className="text-3xl text-neon-cyan" />
              <h3 className="text-xl font-semibold text-neon-cyan">
                Contribution Streak
              </h3>
            </div>
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=optimistotaku&theme=radical&hide_border=true"
              alt="GitHub Streak"
              className="w-full"
            />
          </motion.div>

          {/* Top Languages Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-dark-card p-6 rounded-lg glow-border md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaGithub className="text-3xl text-neon-purple" />
              <h3 className="text-xl font-semibold text-neon-purple">
                Top Languages
              </h3>
            </div>
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=optimistotaku&layout=compact&theme=radical&hide_border=true"
              alt="Top Languages"
              className="w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
} 