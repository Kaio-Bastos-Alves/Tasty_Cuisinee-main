import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_RECIPES } from './data/recipes'
import './css/Receitas.css'
import Header from './header'

type Recipe = {
  id: number
  title: string
  image: string
  category: string
  time: string
  difficulty: string
  likes: number
}

const CATEGORIES: string[] = [
  'Todos',
  'Café da Manhã',
  'Snacks',
  'Marmitas Fit',
  'Veganas',
  'Detox',
  'Low Carb',
  'Sobremesas Saudáveis'
]

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

export default function Receitas() {
  const navigate = useNavigate()
  const [busca, setBusca] = useState<string>('')
  const [categoria, setCategoria] = useState<string>('Todos')

  const receitasFiltradas = useMemo(() => {
    return MOCK_RECIPES.filter((r: Recipe) => {
      const matchCategoria = categoria === 'Todos' || r.category === categoria
      const matchBusca = r.title.toLowerCase().includes(busca.trim().toLowerCase())
      return matchCategoria && matchBusca
    })
  }, [busca, categoria])

  return (
    <main className="receitas-main">
      <Header />

      <section className="search-bar">
        <form className="search-form" onSubmit={e => e.preventDefault()}>
          <input
            type="text"
            placeholder="Buscar receita por nome..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            aria-label="Buscar receita"
          />
          <button type="submit" className="search-icon" aria-label="Buscar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>
      </section>

      <div className="filtros">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`filtro-btn ${categoria === cat ? 'ativo' : ''}`}
            onClick={() => setCategoria(cat)}
            type="button"
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="grid-receitas">
        {receitasFiltradas.map((r: Recipe) => (
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

        {receitasFiltradas.length === 0 && (
          <p className="nenhuma">Nenhuma receita encontrada com os filtros atuais.</p>
        )}
      </section>
    </main>
  )
}
