import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'
import Login from './components/Login'
import Cadastro from './components/Cadastro'
import Home from './components/Home'
import Perfil from './components/Perfil'
import Receitas from './components/Receitas'
import Publicadas from './components/Publicar'
import ReceitaDetalhes from './components/ReceitaDetalhes'
import VPerfil from './components/Perfil copy'
import BemEstar from './components/BemEstar'
import GuiaGastronomico from './components/GuiaGastronomico'
import Contato from './components/Contato'
import Sobre from './components/Sobre'
import VCdastro from './components/Cadastronew.tsx'
import LoginNew from './components/LoginNew.tsx'
import ADM from './components/ADM'

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
