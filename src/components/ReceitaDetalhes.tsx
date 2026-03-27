import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { receitasAPI, favoritosAPI, comentariosAPI, avaliacoesAPI } from '../lib/api';
import './css/receita-detalhes.css';
import Header from './header';

interface Recipe {
  codReceitas: number;
  nomeReceita: string;
  descricao: string;
  manual2: string;
  fotoReceita?: string;
  chefe?: {
    codChefe: number;
    nomeUsuario: string;
    nomeCompleto: string;
  };
}

interface Comentario {
  codComentarios?: number;
  texto: string;
  usuario?: string;
  data?: string;
}

interface Avaliacao {
  codAvaliacao?: number;
  nota: number;
  usuario?: string;
  data?: string;
}

const ReceitaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [novaAvaliacao, setNovaAvaliacao] = useState(5);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [comentarioLoading, setComentarioLoading] = useState(false);
  const [avaliacaoLoading, setAvaliacaoLoading] = useState(false);

  const isLogged = localStorage.getItem('isLogged') === 'true';
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName') || 'Anônimo';

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        setLoading(true);
        if (!id) return;

        const response = await receitasAPI.getById(id);
        if (response.data) {
          setRecipe(response.data as Recipe);
          setError(null);
        } else {
          setError(response.error || 'Receita não encontrada');
        }
      } catch (err) {
        setError('Erro ao carregar receita');
        console.error('Erro ao carregar receita:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  // Carregar comentários
  useEffect(() => {
    const loadComentarios = async () => {
      try {
        const response = await comentariosAPI.getAll();
        if (response.data) {
          setComentarios(response.data as Comentario[]);
        }
      } catch (err) {
        console.error('Erro ao carregar comentários:', err);
      }
    };

    loadComentarios();
  }, []);

  // Carregar avaliações
  useEffect(() => {
    const loadAvaliacoes = async () => {
      try {
        const response = await avaliacoesAPI.getAll();
        if (response.data) {
          setAvaliacoes(response.data as Avaliacao[]);
        }
      } catch (err) {
        console.error('Erro ao carregar avaliações:', err);
      }
    };

    loadAvaliacoes();
  }, []);

  const toggleFavorite = async () => {
    if (!isLogged || !userId) {
      alert('Faça login para favoritar receitas');
      return;
    }

    try {
      if (isFavorite) {
        // Remover dos favoritos
        // Aqui você precisaria implementar a lógica de remover
      } else {
        // Adicionar aos favoritos
        await favoritosAPI.create({
          codUsuario: userId,
          codReceita: id
        });
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Erro ao atualizar favoritos:', err);
    }
  };

  const handleAddComentario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogged || !userId) {
      alert('Faça login para comentar');
      return;
    }

    if (!novoComentario.trim()) {
      alert('Escreva um comentário');
      return;
    }

    setComentarioLoading(true);
    try {
      const response = await comentariosAPI.create({
        texto: novoComentario,
        codUsuario: userId,
        codReceita: id,
        data: new Date().toISOString()
      });

      if (response.status === 200 || response.status === 201) {
        setComentarios([...comentarios, {
          texto: novoComentario,
          usuario: userName,
          data: new Date().toLocaleDateString()
        }]);
        setNovoComentario('');
      }
    } catch (err) {
      console.error('Erro ao adicionar comentário:', err);
    } finally {
      setComentarioLoading(false);
    }
  };

  const handleAddAvaliacao = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogged || !userId) {
      alert('Faça login para avaliar');
      return;
    }

    setAvaliacaoLoading(true);
    try {
      const response = await avaliacoesAPI.create({
        nota: novaAvaliacao,
        codUsuario: userId,
        codReceita: id,
        data: new Date().toISOString()
      });

      if (response.status === 200 || response.status === 201) {
        setAvaliacoes([...avaliacoes, {
          nota: novaAvaliacao,
          usuario: userName,
          data: new Date().toLocaleDateString()
        }]);
      }
    } catch (err) {
      console.error('Erro ao adicionar avaliação:', err);
    } finally {
      setAvaliacaoLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Carregando receita...</p>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div>
        <Header />
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Erro: {error || 'Receita não encontrada'}</p>
          <a href="/receitas">Voltar para receitas</a>
        </div>
      </div>
    );
  }

  const mediaAvaliacao = avaliacoes.length > 0 
    ? (avaliacoes.reduce((sum, a) => sum + a.nota, 0) / avaliacoes.length).toFixed(1)
    : 0;

  return (
    <div>
      <Header />

      <div className="hero">
        <img 
          src={recipe.fotoReceita || 'https://via.placeholder.com/800x400?text=Receita'} 
          alt="Imagem da Receita" 
          style={{ width: '100%', height: '320px', objectFit: 'cover' }} 
        />
        <h1 id="receita-nome">{recipe.nomeReceita}</h1>
        <p>Uma receita deliciosa e saudável para você!</p>
      </div>

      <div className="info-bar">
        <span className="tag" id="receita-categoria">{recipe.descricao}</span>
        <span>👨‍🍳 <span id="receita-chef">{recipe.chefe?.nomeUsuario || 'Chef'}</span></span>
        <span>⭐ <span id="nota">{mediaAvaliacao}</span> ({avaliacoes.length} avaliações)</span>
      </div>

      <div className="container">
        <div className="ingredientes">
          <h2>Modo de Preparo</h2>
          <div id="lista-preparo" style={{ whiteSpace: 'pre-wrap' }}>
            {recipe.manual2}
          </div>
        </div>
      </div>

      <div className="botao">
        <button id="btn-favorito" onClick={toggleFavorite}>
          <span id="favorito-icon">{isFavorite ? '❤️' : '🤍'}</span> 
          <span id="favorito-text">{isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</span>
        </button>
      </div>

      {/* Seção de Avaliações */}
      <div className="container" style={{ marginTop: '2rem' }}>
        <h2>Avaliações</h2>
        
        {isLogged && (
          <form onSubmit={handleAddAvaliacao} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="avaliacao">Sua Avaliação:</label>
              <select
                id="avaliacao"
                value={novaAvaliacao}
                onChange={(e) => setNovaAvaliacao(parseInt(e.target.value))}
                style={{ marginLeft: '1rem', padding: '5px' }}
              >
                <option value="1">1 - Ruim</option>
                <option value="2">2 - Fraco</option>
                <option value="3">3 - Regular</option>
                <option value="4">4 - Bom</option>
                <option value="5">5 - Excelente</option>
              </select>
            </div>
            <button type="submit" disabled={avaliacaoLoading} style={{ padding: '8px 16px', backgroundColor: '#8B5A8F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {avaliacaoLoading ? 'Enviando...' : 'Enviar Avaliação'}
            </button>
          </form>
        )}

        <div style={{ marginBottom: '2rem' }}>
          {avaliacoes.length === 0 ? (
            <p>Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>
          ) : (
            avaliacoes.map((avaliacao, index) => (
              <div key={index} style={{ padding: '1rem', backgroundColor: '#f9f9f9', marginBottom: '1rem', borderRadius: '4px', borderLeft: '4px solid #8B5A8F' }}>
                <p><strong>{avaliacao.usuario || 'Anônimo'}</strong> - {avaliacao.nota} ⭐</p>
                <p><small>{avaliacao.data}</small></p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Seção de Comentários */}
      <div className="container" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <h2>Comentários</h2>
        
        {isLogged && (
          <form onSubmit={handleAddComentario} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <textarea
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Deixe seu comentário..."
              style={{ width: '100%', padding: '10px', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px', fontFamily: 'Arial, sans-serif' }}
              disabled={comentarioLoading}
            />
            <button type="submit" disabled={comentarioLoading} style={{ padding: '8px 16px', backgroundColor: '#8B5A8F', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {comentarioLoading ? 'Enviando...' : 'Enviar Comentário'}
            </button>
          </form>
        )}

        <div>
          {comentarios.length === 0 ? (
            <p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>
          ) : (
            comentarios.map((comentario, index) => (
              <div key={index} style={{ padding: '1rem', backgroundColor: '#f9f9f9', marginBottom: '1rem', borderRadius: '4px', borderLeft: '4px solid #8B5A8F' }}>
                <p><strong>{comentario.usuario || 'Anônimo'}</strong></p>
                <p>{comentario.texto}</p>
                <p><small>{comentario.data}</small></p>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <a href="/receitas" style={{ color: '#8B5A8F', textDecoration: 'none', fontSize: '16px' }}>← Voltar para receitas</a>
      </div>
    </div>
  );
};

export default ReceitaDetalhes;
