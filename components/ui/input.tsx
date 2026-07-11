import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        aria-invalid={hasError || undefined}
        className={cn(
          "h-[52px] w-full rounded-[12px] border bg-card px-4 text-[16px] text-foreground transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-50",
          hasError
            ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
            : "border-input focus-visible:border-brand-500 focus-visible:ring-brand-100",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
