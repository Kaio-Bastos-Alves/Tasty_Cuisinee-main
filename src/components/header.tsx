import { useEffect, useState } from "react"
import "./css/header.css"

export default function Header() {
  const [isLogged, setIsLogged] = useState(false)
  
  useEffect(() => {
    setIsLogged(localStorage.getItem("isLogged") === "true")
  }, [])
  
  const navigate = (path: string, requireAuth = true) => {
    if (requireAuth && !isLogged) {
      alert("Você precisa estar logado para acessar a página")
      window.location.href = "/loginnew"
    } else {
      window.location.href = path
    }
  }
  
  return (
    <header>
      <div className="logo">
        <h1 className="Title">Tasty Cuisine</h1>
      </div>
      <nav className="nav-bar">
        <ul>
          <a href="/home">Home</a>
          <a href="/receitas">Receitas</a>
          <a href="/bem-estar">Bem-Estar</a>
          <a href="/guia-gastronomico">Guia Gastronômico</a>
          <a href="/perfil">Perfil</a>
          <a href="/contato">Contato</a>
          <a href="/sobre">Sobre</a>
        </ul>
      </nav>
    </header>
  )
}
