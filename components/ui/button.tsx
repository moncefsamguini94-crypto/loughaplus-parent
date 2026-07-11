import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "btn-attention inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius)] font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-action-600 text-white shadow-md hover:bg-action-500 hover:-translate-y-px hover:shadow-lg",
        secondary:
          "border border-border bg-card text-brand-700 hover:bg-muted hover:-translate-y-px",
        whatsapp:
          "bg-whatsapp text-white shadow-md hover:-translate-y-px hover:shadow-lg",
        ghost: "text-brand-500 hover:bg-brand-100/60",
        outlineLight:
          "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20",
      },
      size: {
        lg: "h-14 rounded-full px-6 text-[17px]",
        md: "h-12 rounded-full px-5 text-[15px]",
        sm: "h-10 rounded-full px-4 text-[13px]",
        icon: "h-12 w-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
