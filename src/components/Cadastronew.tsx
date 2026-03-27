import { useState } from 'react';
import './css/CadastroNew.css';

export default function CadastroNew() {
  const [formData, setFormData] = useState({
    nome_completo: '',
    idade: '',
    gmail: '',
    senha: '',
    nome_usuario: '',
    rest_alimentar: 'nao'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    
    try {
      const payload = {
        ...formData,
        idade: parseInt(formData.idade),
        cod_user: Math.floor(Math.random() * 1000)
      };
      console.log('Sending payload:', payload);
      
      const response = await fetch('http://localhost:8080/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        setFormData({
          nome_completo: '',
          idade: '',
          gmail: '',
          senha: '',
          nome_usuario: '',
          rest_alimentar: 'nao'
        });
      } else {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        alert('Erro no servidor: ' + response.status);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Erro ao cadastrar usuário: ' + error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="cadastro-container">
      <h2 className="cadastro-title">Cadastro</h2>
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
          />
        </div>
        
        <div className="form-group">
          <select
            name="rest_alimentar"
            value={formData.rest_alimentar}
            onChange={handleChange}
            className="form-select"
          >
            <option value="nao">Sem Restrição Alimentar</option>
            <option value="sim">Com Restrição Alimentar</option>
          </select>
        </div>
        
        <button type="submit" className="submit-btn">
          Cadastrar
        </button>
      </form>
      
      <p className="signup">
        Já tem uma conta?
        <a href="/loginnew"> Login</a>
      </p>
    </div>
  );
}

