/* Motion Primitives — AnimatedUnderlineLink (vendorado e adaptado) */

import { motion, useReducedMotion } from "motion/react";
import type { MouseEvent, ReactNode } from "react";

interface AnimatedUnderlineLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  underlineClassName?: string;
}

/** Link com underline animado — hover com transição suave (VM) */
export function AnimatedUnderlineLink({
  children,
  href,
  onClick,
  className = "",
  underlineClassName = "",
}: AnimatedUnderlineLinkProps) {
  const reduzir = useReducedMotion();

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        data-motion-primitives="animated-underline"
        className={`group relative inline-block outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fundo)] ${className}`}
      >
        {children}
        <motion.span
          aria-hidden
          className={`absolute -bottom-0.5 left-0 h-px w-full bg-[var(--accent)] ${underlineClassName}`}
          initial={{ scaleX: 0, originX: 0 }}
          whileHover={reduzir ? undefined : { scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ transform: "scaleX(1)" }}
        />
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      data-motion-primitives="animated-underline"
      className={`group relative inline-block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--fundo)] ${className}`}
    >
      {children}
      <motion.span
        aria-hidden
        className={`absolute -bottom-0.5 left-0 h-px w-full bg-[var(--accent)] ${underlineClassName}`}
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={reduzir ? undefined : { scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      />
    </button>
  );
}
