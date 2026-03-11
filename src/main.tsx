import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FirebaseProvider } from './components/FirebaseProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <FirebaseProvider>
          <App />
        </FirebaseProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
