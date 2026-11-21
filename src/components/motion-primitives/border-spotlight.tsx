/* Motion Primitives — Spotlight Border: composição oficial do demo
   app/docs/spotlight/spotlight-border.tsx (Spotlight dentro de um
   anel p-[1px]) adaptada aos tokens do dossiê: a borda acende em azul
   perto do cursor, em vez do hover-vm estático. */

import type { ReactNode } from "react";
import { Spotlight } from "./spotlight";
import { cn } from "@/lib/utils";

interface SpotlightBorderProps {
  children: ReactNode;
  /** anel externo (arredondamento, espaçamento extra) */
  className?: string;
  /** conteúdo interno (fundo, paddings) */
  innerClassName?: string;
  /** tamanho do halo que segue o cursor */
  size?: number;
}

export function SpotlightBorder({
  children,
  className,
  innerClassName,
  size = 140,
}: SpotlightBorderProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-lg bg-[var(--borda)] p-[2px]",
        className
      )}
    >
      {/* halo azul que segue o cursor dentro do anel (demo oficial) */}
      <Spotlight
        className="z-0 from-[var(--accent-forte)] via-[var(--accent)] to-[var(--accent)] opacity-90 blur-xl"
        size={size}
      />
      <div
        className={cn(
          "relative z-10 h-full w-full rounded-[inherit] bg-[var(--superficie)]",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
