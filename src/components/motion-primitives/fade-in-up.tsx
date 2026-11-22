/* Entrada suave: opacidade, blur e leve subida. */

import { motion, type MotionProps } from "motion/react";
import { type ReactNode } from "react";

interface FadeInUpProps extends MotionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.5,
  distance = 32,
  once = true,
  className,
  ...motionProps
}: FadeInUpProps) {
  const entrada = { opacity: 0, y: distance, scale: 0.95, filter: "blur(8px)" };
  const visivel = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
  const transicao = { duration, delay, ease: [1, 1, 0.36, 1] as const };

  return (
    <motion.div
      initial={entrada}
      whileInView={visivel}
      viewport={{ once, margin: "-40px" }}
      transition={transicao}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
