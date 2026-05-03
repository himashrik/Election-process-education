"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Bead = ({ size, initialX, initialY, duration, delay }: { size: number, initialX: string, initialY: string, duration: number, delay: number }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/5 blur-sm"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
      }}
      animate={{
        y: [0, -100, 0],
        x: [0, 50, 0],
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

export const FloatingBeads = () => {
  // Create 20 random beads
  const beads = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 40 + 10,
    initialX: `${Math.random() * 100}%`,
    initialY: `${Math.random() * 100}%`,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {beads.map((bead) => (
        <Bead key={bead.id} {...bead} />
      ))}
    </div>
  );
};
