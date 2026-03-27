import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { receitasAPI } from '../lib/api';
import './css/CadastroNew.css';

export default function CadastroReceita() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeReceita: '',
    descricao: '',
    manual2: '',
    categoria: 'Café da Manhã'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verificar se o usuário é chef
  const userType = localStorage.getItem('userType');
  if (userType !== 'chefe') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Acesso Negado</h2>
        <p>Apenas chefs podem cadastrar receitas.</p>
        <a href="/receitas">Voltar para receitas</a>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nomeReceita || !formData.descricao || !formData.manual2) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const chefeId = localStorage.getItem('userId');
      const payload = {
        nomeReceita: formData.nomeReceita,
        descricao: formData.descricao,
        manual2: formData.manual2,
        codChefe: chefeId
      };

      const response = await receitasAPI.create(payload);

      if (response.status === 200 || response.status === 201) {
        alert('Receita cadastrada com sucesso!');
        navigate('/receitas');
      } else {
        setError(response.error || 'Erro ao cadastrar receita');
      }
    } catch (error) {
      setError('Erro ao cadastrar: ' + (error instanceof Error ? error.message : 'Desconhecido'));
      console.error('Erro ao cadastrar receita:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-title">Cadastrar Nova Receita</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="nomeReceita"
            placeholder="Nome da Receita"
            value={formData.nomeReceita}
            onChange={handleChange}
            required
            className="form-input"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <select
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="form-select"
            disabled={loading}
          >
            <option value="Café da Manhã">Café da Manhã</option>
            <option value="Snacks">Snacks</option>
            <option value="Marmitas Fit">Marmitas Fit</option>
            <option value="Veganas">Veganas</option>
            <option value="Detox">Detox</option>
            <option value="Low Carb">Low Carb</option>
            <option value="Sobremesas Saudáveis">Sobremesas Saudáveis</option>
          </select>
        </div>
        
        <div className="form-group">
          <textarea
            name="descricao"
            placeholder="Descrição da Receita"
            value={formData.descricao}
            onChange={handleChange}
            required
            className="form-input"
            disabled={loading}
            style={{ minHeight: '100px', resize: 'vertical' }}
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="manual2"
            placeholder="Modo de Preparo (ingredientes e passo a passo)"
            value={formData.manual2}
            onChange={handleChange}
            required
            className="form-input"
            disabled={loading}
            style={{ minHeight: '200px', resize: 'vertical' }}
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar Receita'}
        </button>
      </form>
      
      <p className="signup">
        <a href="/receitas">Voltar para receitas</a>
      </p>
    </div>
  );
}
