import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { TaskProvider } from './Context/TaskContext.jsx';
import { CustomThemeProvider } from './Theme/CustomTheme.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomThemeProvider> 
      <TaskProvider>
        <App />
      </TaskProvider>
    </CustomThemeProvider>
  </React.StrictMode>
);
