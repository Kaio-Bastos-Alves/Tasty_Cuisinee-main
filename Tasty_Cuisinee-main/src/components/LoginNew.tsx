import { useState } from 'react';
import './css/Login.css';

export default function LoginNew() {
  const [formData, setFormData] = useState({
    nome_usuario: '',
    senha: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8080/usuario/findAll');
      const usuarios = await response.json();
      
      const user = usuarios.find((u: any) => 
        u.nome_usuario === formData.nome_usuario && u.senha === formData.senha
      );

      if (user) {
        alert('Login realizado com sucesso!');
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('userId', user.cod_user);
        window.location.href = '/home';
      } else {
        alert('Usuário ou senha incorretos');
      }
    } catch (error) {
      alert('Erro ao fazer login');
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
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="nome_usuario">Nome de Usuário</label>
          <input
            type="text"
            name="nome_usuario"
            id="nome_usuario"
            value={formData.nome_usuario}
            onChange={handleChange}
            required
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
          />
        </div>
        <button type="submit" className="sign">
          Login
        </button>
      </form>
      <p className="signup">
        Não tem uma conta?
        <a href="/cadastronew"> Cadastre-se</a>
      </p>
    </div>
  );
}