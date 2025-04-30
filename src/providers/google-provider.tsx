import { GoogleOAuthProvider } from '@react-oauth/google'
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export const GoogleProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  )
}
