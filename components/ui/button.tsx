import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-brand/40 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Brand purple gradient — primary CTA across the app
        default:
          "text-ivory bg-linear-to-b from-brand to-brand-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.18),0_1px_0_rgba(24,19,46,0.06),0_6px_16px_-2px_rgba(74,30,158,0.35),0_12px_28px_-6px_rgba(74,30,158,0.28)] hover:-translate-y-px hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.26),inset_0_-1px_0_rgba(0,0,0,0.18),0_1px_0_rgba(24,19,46,0.06),0_10px_20px_-2px_rgba(74,30,158,0.42),0_18px_36px_-8px_rgba(74,30,158,0.36)] active:translate-y-0",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        // Ivory with subtle ink border → brand-deep on hover
        outline:
          "border border-ink/15 bg-ivory text-ink shadow-[0_1px_0_rgba(255,255,255,0.6)_inset,0_1px_2px_rgba(24,19,46,0.04)] hover:border-brand-deep/40 hover:text-brand-deep hover:bg-ivory",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-brand-deep underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3.5",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-[13px] has-[>svg]:px-2.5",
        lg: "h-11 px-5 has-[>svg]:px-4",
        cta: "h-11 px-5 text-[14px] tracking-[0.01em] has-[>svg]:px-5 [&_svg:not([class*='size-'])]:size-3.75",
        "cta-sm": "h-9 px-3.5 text-[13px] has-[>svg]:px-3.5 [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-10",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
