import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { receitasAPI, avaliacoesAPI, acessosAPI } from '../lib/api'
import './css/Home.css'
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
  const [receitas, setReceitas] = useState<Recipe[]>([])
  const [avaliacoes, setAvaliacoes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Carregar receitas
        const receitasResponse = await receitasAPI.getAll()
        if (receitasResponse.data) {
          setReceitas(receitasResponse.data as Recipe[])
        }

        // Carregar avaliações
        const avaliacoesResponse = await avaliacoesAPI.getAll()
        if (avaliacoesResponse.data) {
          setAvaliacoes(avaliacoesResponse.data as any[])
        }
      } catch (err) {
        console.error('Erro ao carregar dados:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calcular média de avaliações por receita
  const calcularMediaAvaliacao = (receitaId: number) => {
    const avaliacoesReceita = avaliacoes.filter((a: any) => a.codReceita === receitaId)
    if (avaliacoesReceita.length === 0) return 0
    const soma = avaliacoesReceita.reduce((acc: number, a: any) => acc + a.nota, 0)
    return (soma / avaliacoesReceita.length).toFixed(1)
  }

  // 5 receitas mais recentes
  const receitasRecentes = useMemo<Recipe[]>(() => {
    return [...receitas]
      .reverse() // Assumindo que as mais recentes estão no final
      .slice(0, 5)
  }, [receitas])

  // 5 receitas mais bem avaliadas
  const receitasTopAvaliadas = useMemo<Recipe[]>(() => {
    return [...receitas]
      .sort((a, b) => {
        const mediaA = parseFloat(calcularMediaAvaliacao(a.codReceitas) as any)
        const mediaB = parseFloat(calcularMediaAvaliacao(b.codReceitas) as any)
        return mediaB - mediaA
      })
      .slice(0, 5)
  }, [receitas, avaliacoes])

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

  const ReceitaCard = ({ receita }: { receita: Recipe }) => (
    <article key={receita.codReceitas} className="card-receita">
      <div className="imagem-receita">
        <img 
          src={receita.fotoReceita || 'https://via.placeholder.com/300x200?text=Receita'} 
          alt={receita.nomeReceita} 
        />
      </div>

      <div className="card-body">
        <span className={`tag ${getCategoryClass(receita.descricao)}`}>{receita.descricao}</span>
        <h3 className="card-title">{receita.nomeReceita}</h3>

        <div className="info-receita">
          <span className="meta">👨‍🍳 {receita.chefe?.nomeUsuario || 'Chef'}</span>
          <button className="favoritar" aria-label="Favoritar">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 1.3c1.7-3.6 9.3 2.9 0 13.4C-1.3 3.2 6.3-2.3 8 1.3z" />
            </svg>
            <span className="likes-count">⭐ {calcularMediaAvaliacao(receita.codReceitas)}</span>
          </button>
        </div>

        <div className="card-actions">
          <button 
            className="ver-receita" 
            onClick={() => handleReceitaClick(receita.codReceitas)} 
            type="button"
          >
            Ver Receita
          </button>
        </div>
      </div>
    </article>
  )

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
        {/* Seção de Receitas Recentes */}
        <h2 style={{ margin: '0 1rem 1.5rem', fontSize: '1.8rem', color: '#333' }}>
          🆕 Receitas Recentes
        </h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Carregando receitas...</p>
          </div>
        ) : receitasRecentes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Nenhuma receita disponível no momento.</p>
          </div>
        ) : (
          <section className="grid-receitas" aria-label="Receitas recentes">
            {receitasRecentes.map((receita) => (
              <ReceitaCard key={receita.codReceitas} receita={receita} />
            ))}
          </section>
        )}

        {/* Seção de Receitas Top Avaliadas */}
        <h2 style={{ margin: '2rem 1rem 1.5rem', fontSize: '1.8rem', color: '#333' }}>
          ⭐ Receitas Mais Bem Avaliadas
        </h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Carregando receitas...</p>
          </div>
        ) : receitasTopAvaliadas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <p>Nenhuma receita disponível no momento.</p>
          </div>
        ) : (
          <section className="grid-receitas" aria-label="Receitas mais bem avaliadas">
            {receitasTopAvaliadas.map((receita) => (
              <ReceitaCard key={receita.codReceitas} receita={receita} />
            ))}
          </section>
        )}

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
