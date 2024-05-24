import { StrictMode } from 'react'
import { GlobalProvider } from './GlobalState'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <GlobalProvider>
      <Analytics />
      <App />
    </GlobalProvider>
  </StrictMode>
)
