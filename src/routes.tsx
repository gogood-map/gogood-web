import { Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout/Layout.tsx'
import { AuthPage } from './pages/AuthPage/AuthPage.tsx'
import { Home } from './pages/Home/Home.tsx'
import { NotFound } from './pages/NotFound/NotFound.tsx'
import { SidebarLayout } from './pages/SidebarLayout/SidebarLayout.tsx'
import { Map } from './pages/Map/Map.tsx'
import { Profile } from './pages/Profile/Profile.tsx'

export const routes = (
    <Routes>
        <Route path='' element={<Layout />}>
            <Route path='' element={<Home />} />
        </Route>
        <Route path='' element={<SidebarLayout />}>
            <Route path='mapa' element={<Map />} />
            <Route path='perfil' element={<Profile/>} />
            <Route path='historico' element={<div />} />
            <Route path='ajustes' element={<div />} />
        </Route>
        <Route path='cadastro' element={<AuthPage type='register' />} />
        <Route path='login' element={<AuthPage type='login' />} />
        <Route path='*' element={<NotFound />} />
    </Routes>
)