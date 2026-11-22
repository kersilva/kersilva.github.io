import { motion, type Variants } from "motion/react";
import { useRef } from "react";

type TextEffectProps = {
  children: string;
  per?: "word" | "char";
  as?: "h2" | "h3" | "p";
  preset?: "slide" | "blur";
  className?: string;
  delay?: number;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const presetVariants: Record<NonNullable<TextEffectProps["preset"]>, NonNullable<TextEffectProps["variants"]>> = {
  slide: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    },
  },
  blur: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.3 } },
    },
  },
};

export function TextEffect({
  children,
  per = "word",
  as = "p",
  preset = "slide",
  className,
  delay = 0,
  variants,
}: TextEffectProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const Component = as === "h2" ? motion.h2 : as === "h3" ? motion.h3 : motion.p;
  const baseAnimation = variants ?? presetVariants[preset];
  const containerVisible = baseAnimation.container?.visible;
  const animation = {
    ...baseAnimation,
    container: {
      ...baseAnimation.container,
      visible: {
        ...(typeof containerVisible === "object" ? containerVisible : {}),
        transition: {
          ...(typeof containerVisible === "object" ? containerVisible.transition : {}),
          delayChildren: delay,
        },
      },
    },
  };
  const parts = per === "char" ? Array.from(children) : children.split(/(\s+)/);

  return (
    <Component
      ref={ref}
      aria-label={children}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={animation.container}
    >
      {parts.map((part, index) => {
        if (per === "word" && /^\s+$/.test(part)) return part;
        return (
          <motion.span
            key={`${part}-${index}`}
            aria-hidden="true"
            className="inline-block whitespace-pre"
            variants={animation.item}
          >
            {part}
          </motion.span>
        );
      })}
    </Component>
  );
}
