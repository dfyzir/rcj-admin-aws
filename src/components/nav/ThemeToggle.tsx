import React from "react";
import { Switch } from "@nextui-org/react";
import { useTheme } from "@/context/themeContext";
import { SunIcon } from "../icons/SunIcon";
import { MoonIcon } from "../icons/MoonIcon";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-2">
      <Switch
        startContent={<SunIcon />}
        endContent={<MoonIcon />}
        isSelected={theme === "light"}
        onValueChange={() => {
          if (theme === "light") {
            setTheme("dark");
          } else {
            setTheme("light");
          }
        }}
      />
    </div>
  );
}
