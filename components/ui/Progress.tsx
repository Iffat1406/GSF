import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number; // 0-100
  label?: string;
  sublabel?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "success";
  showValue?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

const fillStyles = {
  primary: "from-primary-500 to-primary-400",
  secondary: "from-secondary-400 to-secondary-300",
  success: "from-emerald-500 to-emerald-400",
};

export function Progress({
  value,
  label,
  sublabel,
  size = "md",
  variant = "primary",
  showValue = false,
  className,
}: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <span className="text-sm font-medium text-text-primary">{label}</span>
          )}
          {showValue && (
            <span className="text-xs font-medium text-text-secondary tabular-nums">
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-gray-100 rounded-full overflow-hidden",
          sizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full bg-gradient-to-r rounded-full transition-all duration-700 ease-out",
            fillStyles[variant]
          )}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {sublabel && (
        <p className="text-xs text-text-muted">{sublabel}</p>
      )}
    </div>
  );
}
