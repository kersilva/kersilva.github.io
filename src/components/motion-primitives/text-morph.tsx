/* Motion Primitives — Text Morph (componente oficial, adaptado ao alias cn local). */
import { AnimatePresence, motion, type Transition, type Variants } from "motion/react";
import { useId, useMemo, type ElementType, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface TextMorphProps {
  children: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  variants?: Variants;
  transition?: Transition;
}

export function TextMorph({
  children,
  as: Component = "span",
  className,
  style,
  variants,
  transition,
}: TextMorphProps) {
  const uniqueId = useId();
  const characters = useMemo(() => {
    const counts: Record<string, number> = {};
    return children.split("").map((char) => {
      const lower = char.toLowerCase();
      counts[lower] = (counts[lower] || 0) + 1;
      return {
        id: `${uniqueId}-${lower}${counts[lower]}`,
        label: char === " " ? "\u00a0" : char,
      };
    });
  }, [children, uniqueId]);

  const elementVariants: Variants = variants ?? {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
  const elementTransition: Transition = transition ?? {
    type: "spring",
    stiffness: 280,
    damping: 18,
    mass: 0.3,
  };

  return (
    <Component className={cn(className)} aria-label={children} style={style}>
      <AnimatePresence mode="popLayout" initial={false}>
        {characters.map((character) => (
          <motion.span
            key={character.id}
            layoutId={character.id}
            className="inline-block"
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={elementVariants}
            transition={elementTransition}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
