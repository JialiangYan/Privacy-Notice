import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Analytics />
    <App />
  </StrictMode>
)
