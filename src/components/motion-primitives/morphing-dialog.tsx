import {
  createContext,
  useContext,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion, type Transition } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type MorphingDialogState = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
};

const MorphingDialogContext = createContext<MorphingDialogState | null>(null);

function useMorphingDialog() {
  const context = useContext(MorphingDialogContext);
  if (!context) throw new Error("MorphingDialog components need a MorphingDialog parent.");
  return context;
}

export function MorphingDialog({
  children,
  transition,
}: {
  children: ReactNode;
  transition?: Transition;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <MorphingDialogContext.Provider value={{ open, setOpen, id }}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </MorphingDialogContext.Provider>
  );
}

export function MorphingDialogTrigger({
  children,
  className,
  style,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
}) {
  const { open, setOpen, id } = useMorphingDialog();
  return (
    <motion.button
      type="button"
      layoutId={`dialog-${id}`}
      className={cn("relative cursor-pointer text-left", className)}
      style={style}
      onClick={() => setOpen(!open)}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
}

export function MorphingDialogContainer({ children }: { children: ReactNode }) {
  const { open, setOpen } = useMorphingDialog();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("overflow-hidden");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open, setOpen]);

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Fechar certificado"
            className="fixed inset-0 z-50 h-full w-full cursor-default bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <div className="pointer-events-none fixed inset-0 z-[51] flex items-center justify-center overflow-y-auto p-4 sm:p-8">
            {children}
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

export function MorphingDialogContent({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const { id } = useMorphingDialog();
  return (
    <motion.div
      layoutId={`dialog-${id}`}
      role="dialog"
      aria-modal="true"
      className={cn("pointer-events-auto relative", className)}
      style={style}
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function MorphingDialogTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { id } = useMorphingDialog();
  return (
    <motion.h3 layoutId={`dialog-title-${id}`} className={className}>
      {children}
    </motion.h3>
  );
}

export function MorphingDialogSubtitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { id } = useMorphingDialog();
  return (
    <motion.p layoutId={`dialog-subtitle-${id}`} className={className}>
      {children}
    </motion.p>
  );
}

export function MorphingDialogImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { id } = useMorphingDialog();
  return <motion.img layoutId={`dialog-image-${id}`} src={src} alt={alt} className={className} />;
}

export function MorphingDialogClose({ className }: { className?: string }) {
  const { setOpen } = useMorphingDialog();
  return (
    <button
      type="button"
      onClick={() => setOpen(false)}
      aria-label="Fechar diálogo"
      className={cn(
        "absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:bg-black",
        className,
      )}
    >
      <X className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
