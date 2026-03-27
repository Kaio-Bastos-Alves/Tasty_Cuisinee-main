import './css/guia-gastronomico.css'
import Header from './header'

const chefes = [
  { id: 'maria-lima', nome: 'Maria Lima', descricao: 'Especialista em culinária vegetariana e saudável. Criadora do restaurante "Sabor da Terra".', img: 'img/chefe1.jpg' },
  { id: 'joao-prado', nome: 'João Prado', descricao: 'Chefe contemporâneo, une sabores tradicionais com técnicas modernas. Atende no "Gourmet Vital".', img: 'img/chefe2.jpg' },
  { id: 'carla-mendes', nome: 'Carla Mendes', descricao: 'Formada na França, traz inovação à culinária funcional e saudável.', img: 'img/chefe3.jpg' }
]

const restaurantes = [
  { nome: 'Flor de Sal', localizacao: 'São Paulo, SP', culinaria: 'Brasileira contemporânea', img: 'https://images.unsplash.com/photo-1555992336-03a23c6e96f3', id: 'flor-de-sal' },
  { nome: 'Bella Cucina', localizacao: 'Curitiba, PR', culinaria: 'Italiana artesanal', img: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092', id: 'bella-cucina' },
  { nome: 'Veg & Vida', localizacao: 'Salvador, BA', culinaria: 'Vegetariana & saudável', img: 'https://images.unsplash.com/photo-1525610553991-2bede1a236e2', id: 'veg-vida' }
]

export default function GuiaGastronomico() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, tipo: string) => {
    e.preventDefault()
    alert(`${tipo} enviado com sucesso!`)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <div>
      <Header />
      <main>
        <section className="chefes-intro">
          <h2>Conheça nossos Chefes</h2>
          <p>Profissionais apaixonados por gastronomia e saúde. Inspire-se com suas criações e conheça seus restaurantes!</p>
        </section>

        <section className="chefes-container">
          <div className="chefes-lista">
            {chefes.map(chefe => (
              <div key={chefe.id} className="chefe-card">
                <img src={chefe.img} alt={`Chefe ${chefe.nome}`} />
                <h3>{chefe.nome}</h3>
                <p>{chefe.descricao}</p>
                <button onClick={() => window.location.href = `perfil-chefe.html?chefe=${chefe.id}`}>Ver Perfil</button>
              </div>
            ))}
          </div>
          
          <div className="indique-chefe-form">
            <h3>Indique um chefe incrível!</h3>
            <form onSubmit={e => handleSubmit(e, 'Indicação')}>
              <input type="text" placeholder="Nome completo" required />
              <input type="email" placeholder="E-mail do chefe" required />
              <button type="submit">Enviar indicação</button>
            </form>
          </div>
        </section>

        <section className="restaurantes-intro">
          <h2>Restaurantes Recomendados</h2>
          <p>Explore os melhores restaurantes indicados pelos nossos chefes e usuários!</p>
        </section>

        <section className="restaurantes-container">
          <div className="restaurantes-grid">
            {restaurantes.map(rest => (
              <div key={rest.id} className="restaurante-card">
                <img src={rest.img} alt={`Restaurante ${rest.nome}`} />
                <h2>{rest.nome}</h2>
                <p><strong>Localização:</strong> {rest.localizacao}</p>
                <p><strong>Culinária:</strong> {rest.culinaria}</p>
                <a href={`restaurante-detalhes.html?id=${rest.id}`}>Ver mais</a>
              </div>
            ))}
          </div>
          
          <div className="indique-restaurante-form">
            <h3>Indique um restaurante incrível!</h3>
            <form onSubmit={e => handleSubmit(e, 'Restaurante sugerido')}>
              <input type="text" placeholder="Nome do restaurante" required />
              <input type="text" placeholder="Cidade e Estado" required />
              <button type="submit">Enviar sugestão</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}