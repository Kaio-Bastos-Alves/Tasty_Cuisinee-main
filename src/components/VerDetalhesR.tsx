import { useParams, useNavigate } from 'react-router-dom'
import { MOCK_RECIPES } from './data/recipes'
import './css/receita-detalhes.css'
import Header from './header'

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

export default function ReceitaDetalhes() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const receita = MOCK_RECIPES.find(r => r.id === Number(id))
  
  if (!receita) {
    return (
      <div className="receita-not-found">
        <h2>Receita não encontrada</h2>
        <button onClick={() => navigate('/receitas')}>Voltar às receitas</button>
      </div>
    )
  }

  return (
    <main className="receita-detalhes">
      <Header/>
      <button className="btn-voltar" onClick={() => navigate('/receitas')}>
        Voltar à Receitas
      </button>
      
      <div className="receita-header">
        <div className="receita-imagem">
          <img src={receita.image} alt={receita.title} />
        </div>
        
        <div className="receita-info">
          <span className={`tag ${getCategoryClass(receita.category)}`}>{receita.category}</span>
          <h1>{receita.title}</h1>
          <p className="descricao">
            {receita.description || 'Uma deliciosa receita saudável, perfeita para quem busca sabor e nutrição em cada garfada.'}
          </p>
          
          <div className="receita-stats">
            <div className="stat"><span className="icon">🕒</span><span>{receita.time}</span></div>
            <div className="stat"><span className="icon">⚙</span><span>{receita.difficulty}</span></div>
            <div className="stat"><span className="icon">👥</span><span>{receita.servings} porções</span></div>
            <div className="stat"><span className="icon">🔥</span><span>{receita.calories} kcal</span></div>
          </div>
          
          <div className="receita-actions">
            <div className="likes">
              <span>❤ {receita.likes} curtidas</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="receita-content">
        <section className="ingredientes">
          <h2>Ingredientes</h2>
          <ul>
            {(receita.ingredients || []).map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </section>
        
        <section className="modo-preparo">
          <h2>Modo de Preparo</h2>
          <ol>
            {(receita.instructions || []).map((instrucao, index) => (
              <li key={index}>{instrucao}</li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}