"use client";

import { ButtonHTMLAttributes } from "react";

interface ClientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function ClientButton({ children, ...props }: ClientButtonProps) {
  return (
    <button {...props}>
      {children}
    </button>
  );
}
