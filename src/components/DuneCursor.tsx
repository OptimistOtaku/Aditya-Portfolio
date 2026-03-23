'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function DuneCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-screen"
        animate={{
          x: mousePosition.x - (isHovering ? 20 : 4),
          y: mousePosition.y - (isHovering ? 20 : 4),
          transition: { type: 'spring', damping: 20, stiffness: 300, mass: 0.1 }
        }}
      >
        <div style={{
          width: isHovering ? '40px' : '8px',
          height: isHovering ? '40px' : '8px',
          border: isHovering ? '1px solid var(--spice)' : 'none',
          backgroundColor: isHovering ? 'transparent' : 'var(--spice)',
          borderRadius: '0', /* Strict brutalism */
          transform: 'rotate(45deg)',
          transition: 'width 0.3s, height 0.3s, background-color 0.3s'
        }} />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-screen"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          transition: { type: 'spring', damping: 30, stiffness: 200, mass: 0.5 }
        }}
      >
        <div style={{
          width: '4px',
          height: '4px',
          backgroundColor: 'var(--spice-pale)',
          borderRadius: '0',
          transform: 'rotate(45deg)',
          opacity: isHovering ? 1 : 0,
          transition: 'opacity 0.3s'
        }} />
      </motion.div>
    </>
  );
}
