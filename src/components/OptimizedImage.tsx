interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export const OptimizedImage = ({ src, alt, className = '', width, height }: OptimizedImageProps) => {
  // Convert .png/.jpg to .webp
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/, '.webp');
  
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        width={width}
        height={height}
      />
    </picture>
  );
}; 