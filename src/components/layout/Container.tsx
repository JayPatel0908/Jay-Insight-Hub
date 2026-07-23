import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeMap: Record<ContainerSize, string> = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: ContainerSize;
}

export function Container({
  as: Tag = "div",
  size = "xl",
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        sizeMap[size],
        className,
      )}
      {...props}
    />
  );
}
