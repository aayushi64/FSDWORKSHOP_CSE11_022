import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './component/Home.jsx'
import About from './component/About.jsx'
import Dashboard from './component/Dashboard.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Home />
    <About />
    <Dashboard />
  </StrictMode>,
)
