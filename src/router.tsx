import React from 'react'; // Importe React para o Suspense
import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
  Outlet,
} from '@tanstack/react-router';
import { useAuthStore } from './store/authStore';
import { authService } from './services/signin-service';

import LoginContainer from './pages/login/LoginContainer';
import DashboardView from './pages/dashboard/DashboardView';


function RootLayout() {
  return (
    <>
      <React.Suspense fallback={<div>Carregando componente...</div>}>
        <Outlet />
      </React.Suspense>
    </>
  );
}

const rootRoute = createRootRoute({
  component: RootLayout,
});


// Rota Pública: /login
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginContainer, 
});

// Grupo de Rotas Protegidas
const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated-layout',
  component: Outlet, 
  beforeLoad: async () => {
    const { isAuthenticated, login } = useAuthStore.getState();
    if (isAuthenticated) return;

    try {
      const { user } = await authService.checkAuthStatus();
      login(user);
    } catch (error) {
      throw redirect({ to: '/login' });
    }
  },
});

// Rota Protegida: /dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/dashboard',
  component: DashboardView, 
});

// Rota Index que redireciona
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <div>Redirecionando...</div>,
  beforeLoad: () => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    } else {
      throw redirect({ to: '/login' });
    }
  },
});

// A árvore de rotas permanece a mesma
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  authenticatedRoute.addChildren([dashboardRoute]),
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}