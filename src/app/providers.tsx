"use client";

import { SessionProvider } from "next-auth/react";
import { HeroUIProvider } from "@heroui/react";

export function Providers({ children, session }) {
  return (
    <SessionProvider session={session}>
      <HeroUIProvider>{children}</HeroUIProvider>
    </SessionProvider>
  );
}