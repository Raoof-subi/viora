import { cn } from "@/lib/utils";

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
  color?: string;
}

export function WaveDivider({ className, flip = false, color = "var(--surface-border)" }: WaveDividerProps) {
  return (
    <div className={cn("relative w-full overflow-hidden leading-none", className)} aria-hidden="true">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={cn("block w-full h-16 md:h-24", flip && "rotate-180")}
      >
        <path
          d="M0,0 C150,80 350,0 500,40 C650,80 850,0 1000,50 C1150,100 1200,40 1200,40 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.5"
        />
        <path
          d="M0,20 C200,100 400,0 600,60 C800,120 1000,20 1200,60 L1200,120 L0,120 Z"
          fill={color}
          opacity="0.25"
        />
      </svg>
    </div>
  );
}
