import { Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout/Layout.tsx'
import { Home } from './pages/Home/Home.tsx'
import { NotFound } from './pages/NotFound/NotFound.tsx'

export const routes = (
    <Routes>
        <Route path='' element={<Layout />}>
            <Route path='' element={<Home />} />
        </Route>
        <Route path='entrar' element={<div>Entrar</div>} />
        <Route path='cadastrar' element={<div>Cadastrar</div>} />
        <Route path='*' element={<NotFound />} />
    </Routes>
)
