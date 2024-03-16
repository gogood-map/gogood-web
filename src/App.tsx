import { routes } from './routes'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  )
}

export default App
