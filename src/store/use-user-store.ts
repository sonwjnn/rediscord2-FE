import { User } from '@/features/users/types'
import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      user: null,
      setUser: user => set({ user }),
    }),
    { name: 'user-storage', storage: createJSONStorage(() => sessionStorage) },
  ),
)
