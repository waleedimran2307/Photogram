import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer
      theme="light"
      autoClose={2000}
      style={{ fontSize: "13px" }}
    />
    <StrictMode>
      <App />
    </StrictMode>
  </>
);
