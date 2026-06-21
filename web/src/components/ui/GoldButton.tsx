import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GoldButtonProps extends ButtonProps {
  glow?: boolean;
}

export function GoldButton({ className, glow = true, ...props }: GoldButtonProps) {
  return (
    <Button
      className={cn(
        glow && "hover:shadow-luxury-hover",
        className
      )}
      {...props}
    />
  );
}
