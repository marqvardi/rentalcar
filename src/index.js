import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import { BrowserRouter } from "react-router-dom";
import "react-widgets/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer position="top-right" />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
