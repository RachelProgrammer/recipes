import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import store from './store/index';
import { StoreContext } from "./store/storeContext";
import rootStore from "./store/store";
import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);
root.render(
    <React.StrictMode>
      <BrowserRouter>
      <StoreContext.Provider value={rootStore} >
        {/* <Provider store={store}> */}
          <App />
      </StoreContext.Provider>
        {/* </Provider> */}
      </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
