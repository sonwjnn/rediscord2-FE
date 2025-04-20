"use client"

import { useEffect, ReactNode, useCallback, useMemo } from 'react';
import { create } from 'zustand';
import { useLogin, useRegister, useGetCurrentUser } from '@/services/auth/mutations';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthContext } from '@/contexts/AuthContext';
import { getToken, removeSessionCookies } from '@/lib/tokenCookies';
import { User } from '@/types/user';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';


interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: 'user-storage', storage: createJSONStorage(() => sessionStorage) },
  ),
);

export const AFTER_SIGN_IN_REDIRECT_URL = '/';
export const AFTER_LOGOUT_REDIRECT_URL = '/';

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const { user, setUser } = useAuthStore();

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const getCurrentUserMutation = useGetCurrentUser();

  const isLoading = loginMutation.isPending || registerMutation.isPending || getCurrentUserMutation.isPending;

  const clearData = useCallback(() => {
    setUser(null);
    removeSessionCookies()
  }, [setUser]);

  useEffect(() => {
    (async () => {
      console.log(user)
      if (!getToken()) {
        clearData();
        return;
      }

      if (user) {
        return;
      }

      try {
        const response = await getCurrentUserMutation.mutateAsync();
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.log(error);
        clearData();
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const token = getToken()

    if (!token) {
      clearData();
    }
  }, [pathname, clearData]);

  useEffect(() => {
    const handleAuthExpired = () => {
      clearData();

      toast.error('Your session has expired. Please log in again.')

      router.replace('/login');
    };

    window.addEventListener('AUTH_EXPIRED', handleAuthExpired as EventListener);

    return () => {
      window.removeEventListener('AUTH_EXPIRED', handleAuthExpired as EventListener);
    };
  }, [router, clearData]);

  const handleAuthSuccess = useCallback(async () => {
    try {
      const response = await getCurrentUserMutation.mutateAsync();

      if (response.data) {
        setUser(response.data);
        router.replace(AFTER_SIGN_IN_REDIRECT_URL);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }, [getCurrentUserMutation, router, setUser]);

  const login =useCallback(async (usernameOrEmail: string, password: string) => {
    try {
      const response = await loginMutation.mutateAsync({ usernameOrEmail, password });

      if (response.status === 200) {
        // get token to fetch user, redirect if success
        handleAuthSuccess();
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }, [loginMutation, handleAuthSuccess]);

  const register = useCallback(async (username: string, email: string, password: string) => {
    try {
      const response = await registerMutation.mutateAsync({ username, email, password });

      if (response.status === 200) {
        // get token to fetch user, redirect if success
        handleAuthSuccess();
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, [registerMutation, handleAuthSuccess]);

  const logout = useCallback(() => {
    clearData();
  }, [clearData]);

  const value = useMemo(
    () => ({
      isAuthenticated: !!user && !!getToken(),
      currentUser: user,
      login,
      register,
      logout,
      isLoading,
    }),
    [user, login, register, logout, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
