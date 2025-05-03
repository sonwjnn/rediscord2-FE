"use client";

import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const { logout } = useAuth()

  const onClick = () => {
    logout();
  };

  return (
    <span onClick={onClick} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  );
};
