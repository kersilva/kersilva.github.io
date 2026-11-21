/* Motion Primitives — Border Trail. */
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export function BorderTrail({
  className,
  size = 60,
  transition,
}: {
  className?: string;
  size?: number;
  transition?: Transition;
}) {
  const defaultTransition: Transition = {
    repeat: Infinity,
    duration: 5,
    ease: "linear",
  };

  return (
    <div className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border-[3px] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn("absolute aspect-square bg-[var(--accent)] blur-[2px]", className)}
        style={{ width: size, offsetPath: `rect(0 auto auto 0 round ${size}px)` }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={transition ?? defaultTransition}
      />
    </div>
  );
}
