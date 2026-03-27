import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuariosAPI, chefesAPI, favoritosAPI } from '../lib/api';
import Header from './header';
import './css/Perfil.css';

interface Recipe {
  codReceitas: number;
  nomeReceita: string;
  descricao: string;
}

export default function Perfil() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'usuario' | 'chefe' | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const userId = localStorage.getItem('userId');
  const storedUserType = localStorage.getItem('userType') as 'usuario' | 'chefe' | null;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        if (!userId || !storedUserType) {
          setError('Usuário não autenticado');
          navigate('/loginnew');
          return;
        }

        setUserType(storedUserType);

        if (storedUserType === 'usuario') {
          const response = await usuariosAPI.getById(userId);
          if (response.data) {
            setUserData(response.data);
            setFormData(response.data);
          }
        } else {
          const response = await chefesAPI.getById(userId);
          if (response.data) {
            setUserData(response.data);
            setFormData(response.data);
          }
        }

        // Carregar favoritos
        const favResponse = await favoritosAPI.getAll();
        if (favResponse.data) {
          setFavoritos(favResponse.data as Recipe[]);
        }

        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do usuário');
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [userId, storedUserType, navigate]);

  const handleSaveChanges = async () => {
    try {
      if (userType === 'usuario') {
        await usuariosAPI.update(userId!, formData);
      } else {
        await chefesAPI.update(userId!, formData);
      }
      setUserData(formData);
      setEditMode(false);
      alert('Perfil atualizado com sucesso!');
    } catch (err) {
      alert('Erro ao atualizar perfil');
      console.error('Erro:', err);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Erro: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="perfil-container">
        {/* Card do perfil */}
        <aside className="perfil-card">
          <div className="foto-perfil"></div>
          <h2>{userData?.nomeCompleto || userData?.nome_completo || 'Usuário'}</h2>
          <p className="email">{userData?.gmail || userData?.email || 'email@example.com'}</p>

          <div className="progresso">
            <p>Perfil Completo (75%)</p>
            <div className="barra">
              <div className="preenchida"></div>
            </div>
          </div>

          <p>Tipo de Conta:</p>
          <div className="tags">
            <span className="tag verde">{userType === 'chefe' ? 'Chef de Cozinha' : 'Usuário Comum'}</span>
          </div>
        </aside>

        {/* Conteúdo do perfil */}
        <section className="conteudo-perfil">
          {/* Abas */}
          <div className="abas">
            <button className="aba ativa" data-alvo="info">
              <i className="fas fa-user"></i> Informações
            </button>
            <button className="aba" data-alvo="favoritas">
              <i className="fas fa-heart"></i> Favoritas
            </button>
            {userType === 'chefe' && (
              <button className="aba" data-alvo="minhas-receitas">
                <i className="fas fa-upload"></i> Minhas Receitas
              </button>
            )}
          </div>

          {/* Conteúdo - Informações Pessoais */}
          <div className="conteudo info ativa" id="info">
            <h3>Informações Pessoais</h3>

            {editMode ? (
              <>
                <div className="campo-bloco">
                  <label>Nome Completo</label>
                  <input
                    type="text"
                    name="nomeCompleto"
                    value={formData?.nomeCompleto || formData?.nome_completo || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="campo-bloco">
                  <label>Email</label>
                  <input
                    type="email"
                    name="gmail"
                    value={formData?.gmail || formData?.email || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="campo-bloco">
                  <label>Idade</label>
                  <input
                    type="number"
                    name="idade"
                    value={formData?.idade || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="campo-bloco">
                  <label>Nome de Usuário</label>
                  <input
                    type="text"
                    name="nomeUsuario"
                    value={formData?.nomeUsuario || formData?.nome_usuario || ''}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="campo-bloco">
                  <label>Senha</label>
                  <input
                    type="password"
                    name="senha"
                    value={formData?.senha || ''}
                    onChange={handleInputChange}
                    placeholder="Deixe em branco para manter a mesma"
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-roxo" onClick={handleSaveChanges}>
                    Salvar Alterações
                  </button>
                  <button
                    className="btn-roxo"
                    onClick={() => {
                      setEditMode(false);
                      setFormData(userData);
                    }}
                    style={{ backgroundColor: '#999' }}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="campo-bloco">
                  <label>Nome Completo</label>
                  <p>{userData?.nomeCompleto || userData?.nome_completo || 'N/A'}</p>
                </div>

                <div className="campo-bloco">
                  <label>Email</label>
                  <p>{userData?.gmail || userData?.email || 'N/A'}</p>
                </div>

                <div className="campo-bloco">
                  <label>Idade</label>
                  <p>{userData?.idade || 'N/A'}</p>
                </div>

                <div className="campo-bloco">
                  <label>Nome de Usuário</label>
                  <p>{userData?.nomeUsuario || userData?.nome_usuario || 'N/A'}</p>
                </div>

                <button
                  className="btn-roxo"
                  onClick={() => {
                    setEditMode(true);
                    setFormData(userData);
                  }}
                >
                  Editar Perfil
                </button>
              </>
            )}
          </div>

          {/* Conteúdo - Favoritas */}
          <div className="conteudo favoritas" id="favoritas">
            <h3>Receitas Favoritas</h3>
            {favoritos.length === 0 ? (
              <p>Você ainda não tem receitas favoritas.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {favoritos.map((receita) => (
                  <div
                    key={receita.codReceitas}
                    style={{
                      padding: '1rem',
                      border: '1px solid #ddd',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s'
                    }}
                    onClick={() => navigate(`/receitas/${receita.codReceitas}`)}
                  >
                    <h4>{receita.nomeReceita}</h4>
                    <p>{receita.descricao}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Conteúdo - Minhas Receitas (apenas para chefs) */}
          {userType === 'chefe' && (
            <div className="conteudo minhas-receitas" id="minhas-receitas">
              <h3>Minhas Receitas</h3>
              <p>Suas receitas publicadas aparecerão aqui.</p>
              <button
                className="btn-roxo"
                onClick={() => navigate('/cadastro-receita')}
              >
                + Cadastrar Nova Receita
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
