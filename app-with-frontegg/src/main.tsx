import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-pxfzfrroktkz.frontegg.com', 
  clientId: '29954b33-3614-4c79-866e-9e257b3ccce8', 
  appId: '9ed7725e-e065-4d1e-be51-dbdce75dfca9' 
};

const authOptions = {
  keepSessionAlive: true 
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <FronteggProvider 
      contextOptions={contextOptions} 
      hostedLoginBox={true}
      authOptions={authOptions}
    >
      <App />
    </FronteggProvider>
  );
} else {
  console.error('Root element not found');
}
