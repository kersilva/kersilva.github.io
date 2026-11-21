/* Magic UI — Marquee (vendorado e adaptado aos tokens) */

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** direção horizontal do deslizamento */
  reverse?: boolean;
  /** se prende ao hover */
  pauseOnHover?: boolean;
  /** números de repetições do grupo */
  repeat?: number;
  vertical?: boolean;
}
export function Marquee({
  children,
  reverse = false,
  pauseOnHover = false,
  repeat = 4,
  vertical = false,
  className,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex [gap:1.5rem] overflow-hidden",
        !vertical && "flex-row",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 justify-around [gap:1.5rem]",
            !vertical && "flex-row animate-marquee",
            vertical && "flex-col animate-marquee-vertical",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
