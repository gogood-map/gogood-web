import { GoogleOAuthProvider } from '@react-oauth/google'
import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={clientId ? clientId : ''}>
        {routes}
        <SpeedInsights/>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
