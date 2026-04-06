import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../lib/authService';
import './css/Login.css';

export default function LoginNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeDeUsuario: '',
    senha: ''
  });
  const [userType, setUserType] = useState<'usuario' | 'chefe'>('usuario');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result;

      if (userType === 'usuario') {
        result = await authService.loginUsuario(
          formData.nomeDeUsuario,
          formData.senha
        );
      } else {
        result = await authService.loginChefe(
          formData.nomeDeUsuario,
          formData.senha
        );
      }

      if (result.success && result.user) {
        // Salvar no localStorage
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('userId', String(result.user.id));
        localStorage.setItem('userType', result.user.tipo);
        localStorage.setItem('userName', result.user.nome);
        localStorage.setItem('userEmail', result.user.email);

        console.log('Login bem-sucedido:', result.user);
        navigate('/home');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (error) {
      setError(
        'Erro ao fazer login: ' +
        (error instanceof Error ? error.message : 'Desconhecido')
      );
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="form-container">
      <p className="title">Login</p>

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userType">Tipo de Conta</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'usuario' | 'chefe')}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '100%'
            }}
          >
            <option value="usuario">Usuário Comum</option>
            <option value="chefe">Chef de Cozinha</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="nomeDeUsuario">Nome de Usuário</label>
          <input
            type="text"
            name="nomeDeUsuario"
            id="nomeDeUsuario"
            value={formData.nomeDeUsuario}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="sign" disabled={loading}>
          {loading ? 'Entrando...' : 'Login'}
        </button>
      </form>

      <p className="signup">
        Não tem uma conta?
        {userType === 'usuario' ? (
          <>
            <a href="/cadastronew"> Cadastre-se</a>
            <br />
            <small>
              É chef?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setUserType('chefe');
                }}
              >
                Clique aqui
              </a>
            </small>
          </>
        ) : (
          <>
            <a href="/cadastro-chefe"> Cadastre-se como Chef</a>
            <br />
            <small>
              É usuário comum?{' '}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setUserType('usuario');
                }}
              >
                Clique aqui
              </a>
            </small>
          </>
        )}
      </p>
    </div>
  );
}