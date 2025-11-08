"use client";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={mounted ? (isDark ? "Activate light mode" : "Activate dark mode") : "Toggle theme"}
      onClick={toggle}
      className={cn(className)}
    >
      {mounted ? (
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      ) : (
        <span className="block h-4 w-4" aria-hidden />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
