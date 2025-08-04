// SunnyDay.jsx
import React from "react";
import { motion } from "framer-motion";

const Cloud = ({ delay, topPct, duration, sizePct, width }) => {
  const size = sizePct * width;

  return (
    <motion.div
      className="absolute bg-white rounded-full shadow-md"
      style={{
        top: `${topPct * 100}%`,
        width: size,
        height: size,
      }}
      initial={{ x: `-${size}px` }}
      animate={{ x: `${width + size}px` }}
      transition={{
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "linear",
      }}
    />
  );
};

const SunnyDay = ({ width = 800, height = 600 }) => {
  const sunSize = 0.15 * width;

  return (
    <div
      className="relative bg-sky-300 overflow-hidden"
      style={{
        width,
        height,
      }}
    >
      {/* Sun */}
      <motion.div
        className="absolute bg-yellow-400 rounded-full shadow-lg"
        style={{
          top: 0.05 * height,
          left: 0.05 * width,
          width: sunSize,
          height: sunSize,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      />

      {/* Clouds */}
      <Cloud delay={0} topPct={0.2} duration={40} sizePct={0.12} width={width} />
      <Cloud delay={5} topPct={0.35} duration={50} sizePct={0.15} width={width} />
      <Cloud delay={10} topPct={0.5} duratioon={60} sizePct={0.1} width={width} />

      {/* Ground */}
      <div
        className="absolute bg-green-500"
        style={{
          bottom: 0,
          width: "100%",
          height: 0.2 * height,
        }}
      />
    </div>
  );
};

export default SunnyDay;
