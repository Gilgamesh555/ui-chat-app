import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import RouterAppProvider from "./router/Router";
import { SessionProvider } from "./contexts/sessionContext";
import { SearchProvider } from "./contexts/searchContext";
import { PagesProvider } from "./contexts/pagesContext";
import { ChatProvider } from "./contexts/chatContext";

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
