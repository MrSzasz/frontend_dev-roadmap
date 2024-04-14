import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export function ModeToggle() {
  const [theme, setThemeState] = useState<"theme-light" | "dark">(
    "theme-light",
  );

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <div className="flex cursor-none items-center gap-2">
      <Label htmlFor="toggle" className="cursor-none">
        {theme === "theme-light" ? (
          <SunIcon name="Light Mode" />
        ) : (
          <MoonIcon name="Dark Mode" />
        )}
      </Label>
      <Switch
        name="toggle"
        defaultChecked={false}
        onCheckedChange={() => {
          theme === "theme-light"
            ? setThemeState("dark")
            : setThemeState("theme-light");
        }}
        className="cursor-none"
        checked={theme !== "dark"}
      />
    </div>
  );
}
