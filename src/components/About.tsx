import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="min-h-screen py-20 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            About Me
          </h2>
          
          <div className="space-y-6 text-lg">
            <p className="leading-relaxed">
              I'm a passionate full-stack developer with a keen interest in creating innovative and user-friendly applications. 
              My journey in software development has equipped me with a strong foundation in both front-end and back-end technologies.
            </p>
            
            <p className="leading-relaxed">
              I specialize in building modern web applications using cutting-edge technologies like React, Next.js, and Node.js. 
              My approach combines technical expertise with creative problem-solving to deliver efficient and scalable solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Education</h3>
                <p>Bachelor's in Computer Science</p>
                <p className="text-gray-400">University Name</p>
              </div>

              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Experience</h3>
                <p>Full Stack Developer</p>
                <p className="text-gray-400">Company Name</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 