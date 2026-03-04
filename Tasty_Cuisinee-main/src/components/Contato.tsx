import { useState } from 'react'
import './css/contato.css'
import Header from './header'

export default function Contato() {
  const [formData, setFormData] = useState({ nome: '', email: '', mensagem: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso!')
    setFormData({ nome: '', email: '', mensagem: '' })
  }

  return (
    <>
      <Header />
      <main className="contato-container">
        <h1 className="contato-titulo">Fale Conosco</h1>
        <p className="contato-subtitulo">
          Tem alguma dúvida culinária, sugestão de receita ou quer nos dar um feedback? Envie-nos uma mensagem!
        </p>

        <form className="formulario-contato" onSubmit={handleSubmit}>
          <label htmlFor="nome">Nome</label>
          <div className="input-wrapper">
            <i className="fas fa-user input-icon"></i>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="email">E-mail</label>
          <div className="input-wrapper">
            <i className="fas fa-envelope input-icon"></i>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <label htmlFor="mensagem">Assunto</label>
          <div className="input-wrapper">
            <i className="fas fa-comment input-icon"></i>
            <textarea
              id="mensagem"
              name="mensagem"
              rows={5}
              placeholder="Dúvida sobre receitas, sugestão, etc."
              value={formData.mensagem}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Enviar Mensagem</button>
        </form>
      </main>
    </>
  )
}