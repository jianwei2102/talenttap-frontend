import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Main from './Main';
// import SignUp from './src/components/SignUp.tsx';
import App from './App.tsx';
import { AlertsProvider } from './components/alert/AlertContext.tsx';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AlertsProvider>
      <App/>
    </AlertsProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
