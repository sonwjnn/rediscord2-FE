'use client'

import { AuthProvider } from './auth-provider'
import { GoogleProvider } from './google-provider'
// import { ModalProvider } from './modal-provider'
import { QueryProvider } from './query-provider'
// import { SocketProvider } from './socket-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryProvider>
      <GoogleProvider>
        <AuthProvider>{children}</AuthProvider>
      </GoogleProvider>
    </QueryProvider>
  )
}
