import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import the migrated vanilla CSS in the exact order they were in index.html
import './styles/main.css'
import './styles/components.css'
import './styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
