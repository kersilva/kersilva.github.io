/* Motion Primitives — Image Comparison com suporte a interação por hover. */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type MouseEvent,
  type TouchEvent,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "motion/react";
import { cn } from "@/lib/utils";

const ComparisonContext = createContext<MotionValue<number> | null>(null);

export function ImageComparison({
  children,
  className,
  enableHover = false,
  springOptions,
}: {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
  springOptions?: SpringOptions;
}) {
  const [arrastando, setArrastando] = useState(false);
  const posicao = useMotionValue(60);
  const posicaoSuave = useSpring(posicao, springOptions ?? { bounce: 0, duration: 0 });

  function atualizarPosicao(event: MouseEvent<HTMLDivElement> | TouchEvent<HTMLDivElement>) {
    if (!arrastando && !enableHover) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const clientX = "touches" in event ? event.touches[0]?.clientX : event.clientX;
    if (clientX === undefined) return;
    posicao.set(Math.min(100, Math.max(0, ((clientX - bounds.left) / bounds.width) * 100)));
  }

  return (
    <ComparisonContext.Provider value={posicaoSuave}>
      <div
        className={cn("relative select-none overflow-hidden", enableHover && "cursor-ew-resize", className)}
        onMouseMove={atualizarPosicao}
        onMouseDown={() => !enableHover && setArrastando(true)}
        onMouseUp={() => !enableHover && setArrastando(false)}
        onMouseLeave={() => !enableHover && setArrastando(false)}
        onTouchMove={atualizarPosicao}
        onTouchStart={() => !enableHover && setArrastando(true)}
        onTouchEnd={() => !enableHover && setArrastando(false)}
      >
        {children}
      </div>
    </ComparisonContext.Provider>
  );
}

export function ImageComparisonImage({
  className,
  alt,
  src,
  position,
}: {
  className?: string;
  alt: string;
  src: string;
  position: "left" | "right";
}) {
  const positionValue = useContext(ComparisonContext);
  if (!positionValue) throw new Error("ImageComparisonImage precisa estar dentro de ImageComparison.");

  const clipLeft = useTransform(positionValue, (value) => `inset(0 0 0 ${value}%)`);
  const clipRight = useTransform(positionValue, (value) => `inset(0 ${100 - value}% 0 0)`);

  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      style={{ clipPath: position === "left" ? clipLeft : clipRight }}
    />
  );
}

export function ImageComparisonSlider({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const position = useContext(ComparisonContext);
  if (!position) throw new Error("ImageComparisonSlider precisa estar dentro de ImageComparison.");
  const left = useTransform(position, (value) => `${value}%`);

  return (
    <motion.div className={cn("absolute bottom-0 top-0 z-20 w-0.5", className)} style={{ left }}>
      {children}
    </motion.div>
  );
}
