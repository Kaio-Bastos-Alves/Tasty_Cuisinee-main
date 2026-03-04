import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/Home.css'
import './css/Receitas.css'
import Header from './header'
import { MOCK_RECIPES } from './data/recipes'

type Recipe = {
  id: number
  title: string
  image: string
  category: string
  time: string
  difficulty: string
  likes: number
}

const getCategoryClass = (category: string) => {
  const classes: Record<string, string> = {
    'Sobremesas Saudáveis': 'rosa',
    'Café da Manhã': 'verde',
    'Marmitas Fit': 'lilas',
    'Veganas': 'lavanda',
    'Detox': 'verde',
    'Low Carb': 'lilas'
  }
  return classes[category] || 'roxo'
}

export default function Home() {
  const navigate = useNavigate()

  const destacadas = useMemo<Recipe[]>(() => {
    return [...MOCK_RECIPES]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 6)
  }, [])

  return (
    <div className='full-page'>
      <Header />

      <div className='Page'>
        <h1>Comida de verdade,</h1>
        <h2>Sabor de Sobra</h2>
        <h3>Receitas deliciosas criadas com amor e diversão!</h3>
        <div className="buttons">
          <button onClick={() => navigate('/receitas')}>Ver Receitas</button>
          <button onClick={() => navigate('/publicar')}>Publicar Receita</button>
        </div>
      </div>

      <main className="receitas-main" style={{ paddingTop: '2rem' }}>
        <h2 style={{ margin: '0 1rem 1.5rem', fontSize: '1.8rem', color: '#333' }}>Receitas em Destaque</h2>
        
        <section className="grid-receitas" aria-label="Receitas em destaque">
          {destacadas.map((r: Recipe) => (
            <article key={r.id} className="card-receita">
              <div className="imagem-receita">
                <img src={r.image} alt={r.title} />
              </div>

              <div className="card-body">
                <span className={`tag ${getCategoryClass(r.category)}`}>{r.category}</span>
                <h3 className="card-title">{r.title}</h3>

                <div className="info-receita">
                  <span className="meta">🕒 {r.time}</span>
                  <span className="meta">⚙ {r.difficulty}</span>
                  <button className="favoritar" aria-label="Favoritar">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                      <path d="M8 1.3c1.7-3.6 9.3 2.9 0 13.4C-1.3 3.2 6.3-2.3 8 1.3z" />
                    </svg>
                    <span className="likes-count">{r.likes}</span>
                  </button>
                </div>

                <div className="card-actions">
                  <button 
                    className="ver-receita" 
                    onClick={() => navigate(`/receitas/${r.id}`)} 
                    type="button"
                  >
                    Ver Receita
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
          <button 
            className="ver-receita" 
            onClick={() => navigate('/receitas')} 
            type="button"
            style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}
          >
            Ver todas as receitas
          </button>
        </div>
      </main>
    </div>
  )
}
