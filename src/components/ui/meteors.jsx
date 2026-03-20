import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const Meteors = ({ number, className }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    setMeteors(new Array(number || 20).fill(true));
  }, [number]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className || ''}`}>
      {meteors.map((el, idx) => (
        <motion.span
          key={"meteor" + idx}
          className="absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: -50,
            left: Math.floor(Math.random() * (800 - -800) + -800) + "px",
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0, 0],
            x: Math.floor(Math.random() * -200 - 300) + "px",
            y: Math.floor(Math.random() * 300 + 500) + "px",
          }}
          transition={{
            duration: Math.floor(Math.random() * (8 - 2) + 2),
            repeat: Infinity,
            delay: Math.random() * (1 - 0.2) + 0.2,
            ease: "linear",
          }}
        >
          <span className="absolute top-1/2 left-0 transform -translate-y-[50%] w-[50px] h-[1px] bg-gradient-to-r from-[#64748b] to-transparent pointer-events-none" />
        </motion.span>
      ))}
    </div>
  );
};
