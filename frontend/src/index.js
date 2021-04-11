import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppWrapper } from "./context/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error) return false; // Bad Request <server gave error with reason>
        if (failureCount < 3) return true;
      },
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppWrapper>
        <App />
      </AppWrapper>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
