import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const root = document.createElement('div')
root.id = 'workflowplus'

// Fix formatting because for some reason we break it
document.getElementById('__next').appendChild(root)
root.style.width = '100vw'

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
