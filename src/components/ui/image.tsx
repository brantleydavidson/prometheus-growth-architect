
import React from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, width, height, objectFit = "cover", ...props }, ref) => {
    // Ensure the alt text is properly used and not empty
    const safeAlt = alt || "Image"; 
    
    return (
      <img
        ref={ref}
        src={src}
        alt={safeAlt}
        width={width}
        height={height}
        className={className}
        style={{ objectFit }}
        loading="lazy"
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image };
