import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { chefesAPI } from '../lib/api';
import './css/CadastroNew.css';

export default function CadastroChefe() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_completo: '',
    idade: '',
    gmail: '',
    senha: '',
    nome_usuario: '',
    especialidade: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome_completo || !formData.idade || !formData.gmail || !formData.senha || !formData.nome_usuario) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        nomeCompleto: formData.nome_completo,
        idade: parseInt(formData.idade),
        gmail: formData.gmail,
        senha: formData.senha,
        nomeUsuario: formData.nome_usuario
      };

      const response = await chefesAPI.create(payload);

      if (response.status === 200 || response.status === 201) {
        alert('Cadastro de chef realizado com sucesso!');
        navigate('/loginnew');
      } else {
        setError(response.error || 'Erro ao cadastrar chef');
      }
    } catch (error) {
      setError('Erro ao cadastrar: ' + (error instanceof Error ? error.message : 'Desconhecido'));
      console.error('Erro ao cadastrar chef:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-title">Cadastro de Chef</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="nome_completo"
            placeholder="Nome Completo"
            value={formData.nome_completo}
            onChange={handleChange}
            required
            className="form-input"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="number"
            name="idade"
            placeholder="Idade"
            value={formData.idade}
            onChange={handleChange}
            required
            className="form-input"
            min="14"
            max="100"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="email"
            name="gmail"
            placeholder="Email"
            value={formData.gmail}
            onChange={handleChange}
            required
            className="form-input"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
            onChange={handleChange}
            required
            className="form-input"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="nome_usuario"
            placeholder="Nome de Usuário"
            value={formData.nome_usuario}
            onChange={handleChange}
            required
            className="form-input"
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="especialidade"
            placeholder="Sua Especialidade Culinária (opcional)"
            value={formData.especialidade}
            onChange={handleChange}
            className="form-input"
            disabled={loading}
            style={{ minHeight: '80px', resize: 'vertical' }}
          />
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar como Chef'}
        </button>
      </form>
      
      <p className="signup">
        Já tem uma conta?
        <a href="/loginnew"> Login</a>
      </p>
    </div>
  );
}
