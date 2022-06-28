import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {library} from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faCoffee,faXmark, faAppleWhole, faPerson, faHeartPulse , faHouse, faEarthEurope, faBusinessTime, faRightFromBracket, faSpinner, faBook, faUser, faMagnifyingGlass,faKey ,faEnvelope, faChevronRight , faBars,faChevronLeft, faPencil, faClockRotateLeft, faMoon, faK} from '@fortawesome/free-solid-svg-icons';
import reportWebVitals from './reportWebVitals';

library.add(faCheckSquare, faUser,faXmark, faAppleWhole, faPerson, faHeartPulse, faHouse, faEarthEurope, faBusinessTime, faRightFromBracket, faCoffee, faSpinner, faBook,faMagnifyingGlass, faKey,faEnvelope, faChevronRight, faChevronLeft, faPencil, faBars, faClockRotateLeft, faMoon);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
