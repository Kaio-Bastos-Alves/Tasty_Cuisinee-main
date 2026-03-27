import { useState, useEffect } from 'react';

interface Usuario {
  cod_user: number;
  nome_completo: string;
  nome_usuario: string;
  gmail: string;
}

function Adm() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuario/findAll');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      alert('Erro ao carregar usuários');
    }
  };

  const deletarUsuario = async (codUser: number, nomeUsuario: string) => {
    if (confirm(`Tem certeza que deseja deletar o usuário ${nomeUsuario}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/usuario/${codUser}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          alert('Usuário deletado com sucesso!');
          fetchUsuarios();
        } else {
          alert('Erro ao deletar usuário');
        }
      } catch (error) {
        alert('Erro ao deletar usuário');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Administração - Gerenciar Usuários</h1>
      <div style={{ marginTop: '20px' }}>
        {usuarios.map((usuario) => (
          <div key={usuario.cod_user} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            border: '1px solid #ddd',
            marginBottom: '10px',
            borderRadius: '5px'
          }}>
            <div>
              <strong>{usuario.nome_completo}</strong>
              <p style={{ margin: '5px 0', color: '#666' }}>@{usuario.nome_usuario}</p>
              <p style={{ margin: '5px 0', color: '#666' }}>{usuario.gmail}</p>
            </div>
            <button
              onClick={() => deletarUsuario(usuario.cod_user, usuario.nome_usuario)}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Adm;