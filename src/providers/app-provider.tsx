"use client";

import type { ReactNode } from "react";
import { QueryContextProvider } from "./react-query";
import { ThemeProvider } from "./theme-provider";
// import { FontProvider } from "./font-provider";

interface Props {
  children: ReactNode;
}

export const AppContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryContextProvider>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        {/* <FontProvider> */}
        {children}
        {/* </FontProvider> */}
      </ThemeProvider>
    </QueryContextProvider>
  );
};
