import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

const root = document.createElement('div')
root.id = 'workflowplus'
document.body.appendChild(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
