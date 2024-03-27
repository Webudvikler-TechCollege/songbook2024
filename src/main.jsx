import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { SupabaseProvider } from "./Providers/SupabaseProvider.jsx"
import { AuthProvider } from "./Providers/AuthProvider.jsx"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./Styled/Global.style.js"
import { theme } from "./Styled/Theme.style.js"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SupabaseProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <GlobalStyle />
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </SupabaseProvider>
  </React.StrictMode>
)
