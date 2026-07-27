import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  openIndex: number | null;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

/**
 * Accessible image lightbox with keyboard nav (←/→/Esc), focus trap on Escape,
 * and lazy-loaded neighbours. Renders into a portal so it escapes any
 * containing transform/overflow contexts.
 */
export function Lightbox({
  images,
  openIndex,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isOpen = openIndex !== null;
  const current = isOpen ? images[openIndex] : undefined;

  const go = useCallback(
    (delta: number) => {
      if (openIndex === null || images.length === 0) return;
      const next = (openIndex + delta + images.length) % images.length;
      onIndexChange?.(next);
    },
    [openIndex, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose, go]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-border bg-surface-1/90 text-foreground/90 transition-colors hover:bg-surface-2 focus:outline-none focus-visible:ring-focus"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>

          {images.length > 1 && (
            <>
              <NavButton
                side="left"
                label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
              />
              <NavButton
                side="right"
                label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
              />
            </>
          )}

          <motion.figure
            key={current.src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative mx-4 flex max-h-[85dvh] max-w-6xl flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.src}
              alt={current.alt}
              loading="eager"
              decoding="async"
              className="max-h-[75dvh] w-auto rounded-2xl border border-border object-contain shadow-2xl"
            />
            <figcaption className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{current.alt}</span>
              {images.length > 1 && (
                <span aria-live="polite" className="tabular-nums">
                  {openIndex! + 1} / {images.length}
                </span>
              )}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavButton({
  side,
  label,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  onClick: (e: React.MouseEvent) => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface-1/90 text-foreground/90 transition-all hover:bg-surface-2 focus:outline-none focus-visible:ring-focus",
        side === "left" ? "left-4" : "right-4",
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}
