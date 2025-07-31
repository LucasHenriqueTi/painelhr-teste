import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query'; // Importando o cliente de consulta do React Query
import { router } from './router'; // Nosso roteador
import './index.css'; // Seus estilos globais

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* O RouterProvider é o único componente renderizado aqui. */}
      {/* Ele lê as regras do 'router.ts' e decide o que mostrar. */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);