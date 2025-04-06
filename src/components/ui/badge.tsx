// d:/wallet_clone/wallet/src/components/ui/badge.tsx
import React from 'react';
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary text-primary-foreground": variant === 'default',
          "bg-secondary text-secondary-foreground": variant === 'secondary',
          "text-foreground": variant === 'outline',
          "px-1.5 py-0.5 text-[0.7rem]": size === 'sm',
          "px-3 py-1 text-sm": size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};