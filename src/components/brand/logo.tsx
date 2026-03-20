import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const sizes = {
    sm: { icon: "h-7 w-7", text: "text-lg" },
    md: { icon: "h-8 w-8", text: "text-xl" },
    lg: { icon: "h-10 w-10", text: "text-2xl" },
  };

  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1a1035] to-[#2d1b69] shadow-sm",
          sizes[size].icon
        )}
      >
        {/* Subtle glow ring */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/10" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-[60%] w-[60%]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3L5 21h3l1.5-4h5l1.5 4h3L12 3zm0 6l2.2 6h-4.4L12 9z"
            fill="url(#logo-grad)"
          />
          <defs>
            <linearGradient id="logo-grad" x1="12" y1="3" x2="12" y2="21" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c4b5fd" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>
        </svg>
        {/* Sparkle dot */}
        <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_oklch(0.65_0.18_275)]" />
      </div>
      {showText && (
        <span
          className={cn(
            "font-bold tracking-tight",
            sizes[size].text
          )}
        >
          AMAIA
        </span>
      )}
    </Link>
  );
}
