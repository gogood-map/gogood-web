import { Routes, Route } from 'react-router-dom'
import { Layout } from './pages/Layout/Layout.tsx'
import { Home } from './pages/Home/Home.tsx'
import { NotFound } from './pages/NotFound/NotFound.tsx'
import { AuthPage } from './pages/AuthPage/AuthPage.tsx'

export const routes = (
  <Routes>
    <Route path='' element={<Layout />}>
      <Route path='' element={<Home />} />
    </Route>
    <Route path='cadastrar' element={<AuthPage type='register' />} />
    <Route path='entrar' element={<AuthPage type='login' />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
)
