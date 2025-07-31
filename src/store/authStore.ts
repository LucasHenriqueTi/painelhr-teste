import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  // `persist` vai salvar o estado (user, isAuthenticated) no localStorage.
  // Quando o usuário recarregar a página, o Zustand vai ler esses dados.
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-session-storage', // Nome da chave no localStorage
    }
  )
);