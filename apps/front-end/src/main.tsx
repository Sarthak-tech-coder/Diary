import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import "./styles.css";
import { Provider } from "react-redux";
import App from "./app/app.jsx";
import { store } from "../Global/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
