import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Separator (shadcn) adaptado ao dossiê: estica até os trilhos verticais
 * (compensa o padding lateral do container) para que as divisórias
 * horizontais cruzem os trilhos, formando a grade Alexis.
 */
function Separator({
  className,
  ...props
}: React.ComponentProps<"hr">) {
  return (
    <hr
      data-slot="separator"
      className={cn(
        "border-0 border-t border-[var(--borda)] -mx-5 sm:-mx-8 lg:-mx-12",
        className
      )}
      {...props}
    />
  );
}

export { Separator };
