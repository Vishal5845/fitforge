import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
  clickable?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingClasses = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  hover = false,
  clickable = false,
  padding = "md",
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl transition-all duration-300",
        paddingClasses[padding],
        hover && "hover:-translate-y-1 hover:border-orange-500/30",
        clickable && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}