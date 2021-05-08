import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './global-styles/reset-styles.scss';
import './global-styles/global.scss';
import MapContextProvider from './context/map-context/map-context';

ReactDOM.render(
  <React.StrictMode>
    <MapContextProvider>
      <App />
    </MapContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
