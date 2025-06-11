'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '@/components/Avatar';
import About from '@/components/About';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import GitHubStats from '@/components/GitHubStats';
import Contact from '@/components/Contact';
import SplashCursor from '@/components/SplashCursor';




export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-dark-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/10 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-neon-purple">Optimist</span>
                <span className="text-neon-cyan">Otaku</span>
              </h1>
              <h2 className="text-2xl md:text-3xl mb-8 text-gray-300">
                Crafting impactful AI & web solutions
              </h2>
              <div className="h-20 mb-8">
                <TypeAnimation
                  sequence={[
                    'TypeScript',
                    1000,
                    'Python',
                    1000,
                    'React',
                    1000,
                    'FastAPI',
                    1000,
                    'OpenAI',
                    1000,
                    'PostgreSQL',
                    1000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-xl md:text-2xl text-neon-blue"
                  repeat={Infinity}
                />
              </div>
            </motion.div>

            {/* 3D Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="h-[400px] lg:h-[500px]"
            >
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Avatar />
                <OrbitControls enableZoom={false} />
              </Canvas>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-neon-purple rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-neon-purple rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Other Sections */}
      <About />
      <Projects />
      <TechStack />
      <GitHubStats />
      <Contact />
      <SplashCursor />
    </main>
  );
} 