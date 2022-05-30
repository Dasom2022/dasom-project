import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme } from "./theme";
import { RecoilRoot } from "recoil";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
// 모든 Axios 요청에 JWT 추가하도록 설정
axios.defaults.withCredentials = true;
const GlobalStyle = createGlobalStyle`
body, div{
  margin: 0;
  padding: 0;
  border: 0;
}
`;

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
