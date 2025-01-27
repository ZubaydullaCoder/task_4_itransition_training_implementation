"use client";

import { useEffect, useState } from "react";

interface ClientProviderProps {
  children: React.ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a skeleton/loading state if preferred
  }

  return <>{children}</>;
}
