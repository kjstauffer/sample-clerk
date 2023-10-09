import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@descope/react-sdk';

import { App } from './App';

// eslint-disable-next-line import/no-unassigned-import
import './App.css';

ReactDOM.createRoot(document.getElementById(`root`)!).render(
  <React.StrictMode>
    <AuthProvider projectId="P2ViY8BGoztZ1BiDPinPsOWSdvDQ">
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
