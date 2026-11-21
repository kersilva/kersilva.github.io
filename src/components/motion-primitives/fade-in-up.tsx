/* Motion Primitives — FadeInUp (vendorado e adaptado aos tokens) */

import { motion, useInView, useReducedMotion, type MotionProps } from "motion/react";
import { useRef, type ReactNode } from "react";

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
  distance = 16,
  once = true,
  className,
  ...motionProps
}: FadeInUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-40px" });
  const reduzir = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduzir ? undefined : { opacity: 0, y: distance }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
