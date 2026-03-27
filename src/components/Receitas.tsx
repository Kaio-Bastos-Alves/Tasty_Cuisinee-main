import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { receitasAPI, acessosAPI } from '../lib/api'
import './css/Receitas.css'
import Header from './header'

type Recipe = {
  codReceitas: number
  nomeReceita: string
  descricao: string
  manual2: string
  fotoReceita?: string
  chefe?: {
    codChefe: number
    nomeUsuario: string
    nomeCompleto: string
  }
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
  const [receitas, setReceitas] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Carregar receitas do back-end
  useEffect(() => {
    const loadReceitas = async () => {
      try {
        setLoading(true)
        const response = await receitasAPI.getAll()
        if (response.data) {
          setReceitas(response.data as Recipe[])
          setError(null)
        } else {
          setError(response.error || 'Erro ao carregar receitas')
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor')
        console.error('Erro ao carregar receitas:', err)
      } finally {
        setLoading(false)
      }
    }

    loadReceitas()
  }, [])

  const receitasFiltradas = useMemo(() => {
    return receitas.filter((r: Recipe) => {
      const matchCategoria = categoria === 'Todos' || r.descricao.toLowerCase().includes(categoria.toLowerCase())
      const matchBusca = r.nomeReceita.toLowerCase().includes(busca.trim().toLowerCase())
      return matchCategoria && matchBusca
    })
  }, [busca, categoria, receitas])

  const handleReceitaClick = async (receitaId: number) => {
    try {
      // Registrar acesso quando a receita é clicada
      const usuarioId = localStorage.getItem('userId') || '1'
      await acessosAPI.create({
        codReceita: receitaId,
        codUsuario: usuarioId,
        dataAcesso: new Date().toISOString()
      })
    } catch (err) {
      console.error('Erro ao registrar acesso:', err)
    }
    
    navigate(`/receitas/${receitaId}`)
  }

  if (loading) {
    return (
      <main className="receitas-main">
        <Header />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Carregando receitas...</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="receitas-main">
        <Header />
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Erro: {error}</p>
          <p>Verifique se o servidor está rodando em http://localhost:8080</p>
        </div>
      </main>
    )
  }

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
          <article key={r.codReceitas} className="card-receita">
            <div className="imagem-receita">
              <img 
                src={r.fotoReceita || 'https://via.placeholder.com/300x200?text=Receita'} 
                alt={r.nomeReceita} 
              />
            </div>

            <div className="card-body">
              <span className={`tag ${getCategoryClass(r.descricao)}`}>{r.descricao}</span>
              <h3 className="card-title">{r.nomeReceita}</h3>

              <div className="info-receita">
                <span className="meta">👨‍🍳 {r.chefe?.nomeUsuario || 'Chef'}</span>
                <button className="favoritar" aria-label="Favoritar">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M8 1.3c1.7-3.6 9.3 2.9 0 13.4C-1.3 3.2 6.3-2.3 8 1.3z" />
                  </svg>
                  <span className="likes-count">0</span>
                </button>
              </div>

              <div className="card-actions">
                <button
                  className="ver-receita"
                  onClick={() => handleReceitaClick(r.codReceitas)}
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

      {/* Botão para cadastrar receita (somente chefes) */}
      {localStorage.getItem('userType') === 'chefe' && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <button
            onClick={() => navigate('/cadastro-receita')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#8B5A8F',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            + Cadastrar Nova Receita
          </button>
        </div>
      )}
    </main>
  )
}
