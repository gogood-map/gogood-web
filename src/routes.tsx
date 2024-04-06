import { Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout/Layout.tsx'
import { AuthPage } from './pages/AuthPage/AuthPage.tsx'
import { Home } from './pages/Home/Home.tsx'
import { NotFound } from './pages/NotFound/NotFound.tsx'
import { SidebarLayout } from './pages/SidebarLayout/SidebarLayout.tsx'

export const routes = (
    <Routes>
        <Route path='' element={<Layout />}>
            <Route path='' element={<Home />} />
        </Route>
        <Route path='sidebartexte' element={<SidebarLayout />}>
            
        </Route>
        <Route path='cadastro' element={<AuthPage type='register' />} />
        <Route path='login' element={<AuthPage type='login' />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
)