import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom"
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App/>
    </BrowserRouter>
  // </StrictMode>,
)
