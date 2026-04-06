import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosAPI, chefesAPI } from '../lib/api';
import './css/Login.css';

export default function LoginNew() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome_de_usuario: '',
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
      if (userType === 'usuario') {
        // Login de usuário comum
        const response = await usuariosAPI.getAll();
        if (response.data) {
          const usuarios = response.data as any[];
          const user = usuarios.find((u: any) => 
            u.nome_de_usuario === formData.nome_de_usuario && u.senha === formData.senha
          );

          if (user) {
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('userId', user.cod_user || user.codUser);
            localStorage.setItem('userType', 'usuario');
            localStorage.setItem('userName', user.nome_de_usuario);
            localStorage.setItem('userEmail', user.gmail);
            navigate('/home');
          } else {
            setError('Usuário ou senha incorretos');
          }
        } else {
          setError('Erro ao conectar com o servidor');
        }
      } else {
        // Login de chef
        const response = await chefesAPI.getAll();
        if (response.data) {
          const chefes = response.data as any[];
          const chef = chefes.find((c: any) => 
            c.nome_de_usuario === formData.nome_de_usuario && c.senha === formData.senha
          );

          if (chef) {
            localStorage.setItem('isLogged', 'true');
            localStorage.setItem('userId', chef.cod_chefe || chef.codChefe);
            localStorage.setItem('userType', 'chefe');
            localStorage.setItem('userName', chef.nome_de_usuario);
            localStorage.setItem('userEmail', chef.gmail);
            navigate('/home');
          } else {
            setError('Chef ou senha incorretos');
          }
        } else {
          setError('Erro ao conectar com o servidor');
        }
      }
    } catch (error) {
      setError('Erro ao fazer login: ' + (error instanceof Error ? error.message : 'Desconhecido'));
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
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
      
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="userType">Tipo de Conta</label>
          <select
            id="userType"
            value={userType}
            onChange={(e) => setUserType(e.target.value as 'usuario' | 'chefe')}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="usuario">Usuário Comum</option>
            <option value="chefe">Chef de Cozinha</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="nome_de_usuario">Nome de Usuário</label>
          <input
            type="text"
            name="nome_de_usuario"
            id="nome_de_usuario"
            value={formData.nome_de_usuario}
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
            <small>É chef? <a href="/login-chefe">Clique aqui</a></small>
          </>
        ) : (
          <>
            <a href="/cadastro-chefe"> Cadastre-se como Chef</a>
            <br />
            <small>É usuário comum? <a href="/loginnew">Clique aqui</a></small>
          </>
        )}
      </p>
    </div>
  );
}
