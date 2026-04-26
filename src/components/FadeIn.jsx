import React from "react";
import { motion } from "motion/react";

export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className = "",
  as: Tag = "div",
  once = true,
  amount = 0.2,
}) {
  const MotionTag = motion[Tag] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
