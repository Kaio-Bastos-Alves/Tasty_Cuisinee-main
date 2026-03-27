import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App.tsx'
import Login from './components/Login.tsx'
import Cadastro from './components/Cadastro.tsx'
import Home from './components/Home.tsx'
import Perfil from './components/Perfil.tsx'
import Receitas from './components/Receitas.tsx'
import Publicadas from './components/Publicar.tsx'
import ReceitaDetalhes from './components/ReceitaDetalhes.tsx'
import VPerfil from './components/Perfil copy.tsx'
import BemEstar from './components/BemEstar.tsx'
import GuiaGastronomico from './components/GuiaGastronomico.tsx'
import Contato from './components/Contato.tsx'
import Sobre from './components/Sobre.tsx'
import VCdastro from './components/Cadastronew.tsx'
import LoginNew from './components/LoginNew.tsx'
import ADM from './components/ADM.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App/> },
  { path: "/login", element: <Login/> },
  { path: "/cadastro", element: <Cadastro/> },
  { path: "/home", element: <Home/> },
  { path: "/perfil", element: <Perfil/> },
  { path: "/receitas", element: <Receitas/> },
  { path: "/publicar", element: <Publicadas/> },
  { path: '/receitas/:id', element: <ReceitaDetalhes/> },
  { path: '/aba', element: <VPerfil/> },
  { path: '/bem-estar', element: <BemEstar/> },
  { path: '/guia-gastronomico', element: <GuiaGastronomico/> },
  { path: '/contato', element: <Contato/> },
  { path: '/cadastronew', element: <VCdastro/>  },
  { path: '/loginnew', element: <LoginNew/> },
  { path: '/sobre', element: <Sobre/> },
  { path: "/ADM", element: <ADM/> },
  { path: '*', element: <div style={{textAlign: 'center', padding: '2rem'}}><h2>Página não encontrada</h2><a href="/">Voltar ao início</a></div> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Carregando...</div>}/>
  </StrictMode>
)
