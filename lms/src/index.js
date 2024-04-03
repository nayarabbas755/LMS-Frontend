
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PrimeReactProvider } from 'primereact/api';
import {
  BrowserRouter,
} from "react-router-dom";
const options = {  appendTo: 'self'};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PrimeReactProvider value={options}>
  <BrowserRouter><App/></BrowserRouter>
  </PrimeReactProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
