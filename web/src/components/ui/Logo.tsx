import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_ASPECT = 1224 / 277;

const sizeMap = {
  sm: { height: 28, className: "h-7 w-auto" },
  md: { height: 40, className: "h-10 w-auto" },
  lg: { height: 56, className: "h-14 w-auto" },
  xl: { height: 96, className: "h-[90px] w-auto md:h-24" },
  "2xl": { height: 160, className: "h-28 w-auto sm:h-32 md:h-40" },
} as const;

interface LogoProps {
  size?: keyof typeof sizeMap;
  className?: string;
  priority?: boolean;
}

export function Logo({ size = "md", className, priority }: LogoProps) {
  const { height, className: sizeClassName } = sizeMap[size];
  const width = Math.round(height * LOGO_ASPECT);

  return (
    <Image
      src="/logo.png"
      alt="VIORA"
      width={width}
      height={height}
      priority={priority}
      unoptimized
      className={cn(sizeClassName, "bg-transparent", className)}
    />
  );
}
