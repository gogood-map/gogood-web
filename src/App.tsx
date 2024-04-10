import { GoogleOAuthProvider } from '@react-oauth/google'
import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthProvider/AuthProvider'

function App() {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    
    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId={clientId ? clientId : ''}>
                <AuthProvider>
                        {routes}
                </AuthProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    )
}

export default App