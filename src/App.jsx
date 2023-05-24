import React from 'react';
import './App.css';
import Router from './shared/Router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CookiesProvider } from 'react-cookie';
import { GlobalStyles } from './styles/GlobalStyles';

const queryClient = new QueryClient();

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Router />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
