import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createRoot } from 'react-dom/client';
// import Main from './Main';
// import SignUp from './src/components/SignUp.tsx';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertsProvider } from './components/AlertContext.tsx';
import { Provider } from "react-redux";
import { store } from "./store/Store.tsx";

// ReactDOM.render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <AlertsProvider>
//         <App />
//       </AlertsProvider>
//     </React.StrictMode>
//   </Provider>,
//   document.getElementById('root')
// );

const root = createRoot(document.getElementById('root')!);
root.render(<Provider store={store}>
  <React.StrictMode>
    <AlertsProvider>
      <App />
    </AlertsProvider>
  </React.StrictMode>
</Provider>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
