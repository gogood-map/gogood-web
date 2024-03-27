import { GoogleOAuthProvider } from '@react-oauth/google'
import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId='112629213943-ltci50f3petj9rfckhofatc6sve64btj.apps.googleusercontent.com'>
        {routes}
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
