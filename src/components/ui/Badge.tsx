import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import type { Difficulty, PoseType } from '@/types';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center font-medium rounded-full',
      'transition-colors duration-150'
    );

    const variantStyles = {
      default: 'bg-neutral-100 text-neutral-700',
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-success-light text-success',
      warning: 'bg-warning-light text-warning',
      error: 'bg-error-light text-error',
      info: 'bg-info-light text-info',
    };

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-xs',
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

// Specialized badge for difficulty levels
interface DifficultyBadgeProps extends Omit<BadgeProps, 'variant'> {
  difficulty: Difficulty;
}

function DifficultyBadge({ difficulty, className, ...props }: DifficultyBadgeProps) {
  const variantMap: Record<Difficulty, BadgeProps['variant']> = {
    beginner: 'success',
    intermediate: 'warning',
    advanced: 'error',
  };

  const labelMap: Record<Difficulty, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <Badge
      variant={variantMap[difficulty]}
      className={cn('capitalize', className)}
      {...props}
    >
      {labelMap[difficulty]}
    </Badge>
  );
}

// Specialized badge for pose types
interface PoseTypeBadgeProps extends Omit<BadgeProps, 'variant'> {
  poseType: PoseType;
}

const poseTypeColors: Record<PoseType, string> = {
  standing: 'bg-emerald-100 text-emerald-700',
  seated: 'bg-blue-100 text-blue-700',
  prone: 'bg-amber-100 text-amber-700',
  supine: 'bg-violet-100 text-violet-700',
  inversion: 'bg-rose-100 text-rose-700',
  arm_balance: 'bg-orange-100 text-orange-700',
  twist: 'bg-teal-100 text-teal-700',
  backbend: 'bg-pink-100 text-pink-700',
  forward_fold: 'bg-purple-100 text-purple-700',
  hip_opener: 'bg-cyan-100 text-cyan-700',
  balance: 'bg-indigo-100 text-indigo-700',
  restorative: 'bg-slate-100 text-slate-700',
};

const poseTypeLabels: Record<PoseType, string> = {
  standing: 'Standing',
  seated: 'Seated',
  prone: 'Prone',
  supine: 'Supine',
  inversion: 'Inversion',
  arm_balance: 'Arm Balance',
  twist: 'Twist',
  backbend: 'Backbend',
  forward_fold: 'Forward Fold',
  hip_opener: 'Hip Opener',
  balance: 'Balance',
  restorative: 'Restorative',
};

function PoseTypeBadge({ poseType, className, ...props }: PoseTypeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        'px-2.5 py-1 text-xs',
        poseTypeColors[poseType],
        className
      )}
      {...props}
    >
      {poseTypeLabels[poseType]}
    </span>
  );
}

export { Badge, DifficultyBadge, PoseTypeBadge };
