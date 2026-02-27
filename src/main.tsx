import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";

import App from "./App";
import { store } from "./store/store";
import "./index.css";
import { loadAuth } from "./features/auth/authSlice";

store.dispatch(loadAuth());

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("❌ Root element not found in index.html");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
