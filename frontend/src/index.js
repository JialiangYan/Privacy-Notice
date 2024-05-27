import { StrictMode } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import ReactDOM from 'react-dom/client'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Analytics mode={'production'} />
    <SpeedInsights />
    <App />
  </StrictMode>
)
