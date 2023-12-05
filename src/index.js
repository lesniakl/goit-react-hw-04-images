import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';
import { FinderProvider } from 'hooks/useFinder';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FinderProvider>
      <App />
    </FinderProvider>
  </React.StrictMode>
);
