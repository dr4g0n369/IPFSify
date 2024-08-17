import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import customTheme from "./customTheme.js";
import { UserWeb3ContextProvider } from "./contexts/web3context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <UserWeb3ContextProvider>
        <App />
      </UserWeb3ContextProvider>
      
    </ChakraProvider>
  </React.StrictMode>
);
