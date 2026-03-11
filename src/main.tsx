import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { FirebaseProvider } from './components/FirebaseProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query-client';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <FirebaseProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <App />
          </BrowserRouter>
        </FirebaseProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
