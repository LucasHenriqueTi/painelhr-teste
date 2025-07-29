import { create } from "zustand";


interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    Login: (user: User) => void;
    Logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    Login: (user) => set ({ user, isAuthenticated: true}),
    Logout: () => set ({ user: null, isAuthenticated: false}),
}))

