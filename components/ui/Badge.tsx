import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "gray" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

const variantStyles = {
  primary: "bg-primary-50 text-primary-600 ring-primary-200/50",
  secondary: "bg-secondary-50 text-secondary-600 ring-secondary-200/50",
  success: "bg-emerald-50 text-emerald-600 ring-emerald-200/50",
  warning: "bg-amber-50 text-amber-600 ring-amber-200/50",
  danger: "bg-red-50 text-red-600 ring-red-200/50",
  gray: "bg-gray-100 text-gray-600 ring-gray-200/50",
  outline: "bg-transparent border border-border text-text-secondary ring-0",
};

const dotColors = {
  primary: "bg-primary-500",
  secondary: "bg-secondary-400",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  gray: "bg-gray-400",
  outline: "bg-gray-400",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-2xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  children,
  variant = "gray",
  size = "md",
  dot = false,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium ring-1 ring-inset",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn("size-1.5 rounded-full", dotColors[variant])}
        />
      )}
      {children}
    </span>
  );
}
