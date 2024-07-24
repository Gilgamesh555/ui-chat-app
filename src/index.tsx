import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import RouterAppProvider from "./Router/Router";
import { SessionProvider } from "./Contexts/SessionContext";
import { SearchProvider } from "./Contexts/SearchContext";
import { PagesProvider } from "./Contexts/PagesContext";
import { ChatProvider } from "./Contexts/ChatContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SessionProvider>
      <SearchProvider>
        <PagesProvider>
          <ChatProvider>
            <RouterAppProvider />
          </ChatProvider>
        </PagesProvider>
      </SearchProvider>
    </SessionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
