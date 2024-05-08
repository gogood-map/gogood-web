import { GoogleOAuthProvider } from '@react-oauth/google'
import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './hooks/AuthProvider/AuthProvider'

function App() {
    const clientId = "112629213943-ltci50f3petj9rfckhofatc6sve64btj.apps.googleusercontent.com"

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
