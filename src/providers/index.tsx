'use client'

import { AuthProvider } from './auth-provider';
// import { ModalProvider } from './modal-provider'
import { QueryProvider } from './query-provider'
// import { SocketProvider } from './socket-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
