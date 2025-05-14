
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export function Image({
  src,
  alt,
  className,
  width,
  height,
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("max-w-full h-auto", className)}
      width={width}
      height={height}
      {...props}
    />
  );
}
