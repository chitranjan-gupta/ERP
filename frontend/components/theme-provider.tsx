"use client";
import React from "react"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProvider as MaterialThemesProvider } from "@material-tailwind/react"

export function ThemeProviders({ children, ...props }: ThemeProviderProps) {
  return <MaterialThemesProvider {...props}>
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  </MaterialThemesProvider>
}
