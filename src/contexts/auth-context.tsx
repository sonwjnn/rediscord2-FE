"use client"

import { createContext } from 'react';
import { User } from '@/types/user';

export interface AuthContextType {
  isAuthenticated: boolean;
  currentUser: User | null;
  login: (usernameOrEmail: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  isLoading: boolean;
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
