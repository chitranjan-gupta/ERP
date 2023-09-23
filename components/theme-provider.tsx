"use client";
import { ThemeProvider } from "@material-tailwind/react";
import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProviders({ children, ...props }: ThemeProviderProps) {
  return <ThemeProvider {...props}>
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  </ThemeProvider>;
}
