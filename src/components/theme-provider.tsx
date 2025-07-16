import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import type { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  value?: object;
}

export function ThemeProvider({ children, value }: ThemeProviderProps) {
  return <MTThemeProvider value={value}>{children}</MTThemeProvider>;
}

export default ThemeProvider; 