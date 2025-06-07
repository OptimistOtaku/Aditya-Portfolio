'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaEnvelope, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <section id="contact" className="py-20 bg-dark-bg">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-neon-purple">Get in</span>{' '}
            <span className="text-neon-cyan">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Let's discuss how we can work together to bring your ideas to life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-dark-card p-6 rounded-lg glow-border"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  $ name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-dark-bg border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:border-neon-purple transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  $ email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-dark-bg border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:border-neon-purple transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  $ message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-dark-bg border border-neon-purple/30 rounded-lg text-white focus:outline-none focus:border-neon-purple transition-colors"
                  placeholder="Enter your message"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-neon-purple text-white rounded-lg hover:bg-neon-purple/80 transition-colors glow-border"
              >
                $ send_message
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-dark-card p-6 rounded-lg glow-border"
          >
            <h3 className="text-xl font-semibold text-neon-purple mb-6">
              Connect with me
            </h3>

            <div className="space-y-6">
              <a
                href="mailto:contact@optimistotaku.com"
                className="flex items-center gap-4 p-4 bg-dark-bg/50 rounded-lg hover:bg-dark-bg transition-colors group"
              >
                <FaEnvelope className="text-2xl text-neon-purple" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  contact@optimistotaku.com
                </span>
              </a>

              <a
                href="https://github.com/optimistotaku"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-dark-bg/50 rounded-lg hover:bg-dark-bg transition-colors group"
              >
                <FaGithub className="text-2xl text-neon-cyan" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  @optimistotaku
                </span>
              </a>

              <a
                href="https://linkedin.com/in/optimistotaku"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-dark-bg/50 rounded-lg hover:bg-dark-bg transition-colors group"
              >
                <FaLinkedin className="text-2xl text-neon-purple" />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  OptimistOtaku
                </span>
              </a>
            </div>

            <div className="mt-8 p-4 bg-dark-bg/50 rounded-lg">
              <h4 className="text-lg font-semibold text-neon-cyan mb-2">
                Available for:
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Full-time positions</li>
                <li>• Freelance projects</li>
                <li>• Open source contributions</li>
                <li>• Technical consulting</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 