'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils/cn';

interface ProtectedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  showTrademark?: boolean;
}

export function ProtectedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  containerClassName,
  priority,
  showTrademark = false,
}: ProtectedImageProps) {
  return (
    <div className={cn('relative', containerClassName)}>
      <div
        className="relative w-full h-full select-none"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          className={cn(className, 'pointer-events-none')}
          priority={priority}
          draggable={false}
        />
        {showTrademark && (
          <div className="absolute left-0 right-0 bottom-[50px] text-center">
            <span className="text-[10px] text-neutral-400 tracking-wide">www.yoga-sequencing.com</span>
          </div>
        )}
      </div>
    </div>
  );
}
