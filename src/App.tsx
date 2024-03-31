import { GoogleOAuthProvider } from '@react-oauth/google'
import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId={clientId ? clientId : ''}>
                {routes}
            </GoogleOAuthProvider>
        </BrowserRouter>
    )
}

export default App