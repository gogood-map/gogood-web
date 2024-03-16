import { Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout/Layout.tsx'

export const routes = (
    <Routes>
        <Route path='/' element={<Layout />}>
            <Route path='about' element={<div>About</div>} />
            <Route path='contact' element={<div>Contact</div>} />
        </Route>
        <Route path='entrar' element={<div>Entrar</div>} />
        <Route path='cadastrar' element={<div>Cadastrar</div>} />
        <Route path='*' element={<div>Not Found</div>} />
    </Routes>
)
