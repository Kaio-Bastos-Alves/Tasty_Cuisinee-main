import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/receita-detalhes.css';

interface Recipe {
  id: string;
  nome: string;
  categoria: string;
  tempo: number;
  dificuldade: string;
  favoritos: number;
  nota: number;
  ingredientes: string[];
  preparo: string[];
  imagem: string;
}

const ReceitaDetalhes: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipe = () => {
      const mockRecipe: Recipe = {
        id: id || '1',
        nome: 'Bolo de Chocolate Fit',
        categoria: 'Sobremesa',
        tempo: 45,
        dificuldade: 'Fácil',
        favoritos: 128,
        nota: 4.8,
        ingredientes: [
          '2 xícaras de farinha de aveia',
          '1/2 xícara de cacau em pó',
          '1 xícara de açúcar demerara',
          '3 ovos',
          '1 xícara de leite desnatado'
        ],
        preparo: [
          'Pré-aqueça o forno a 180°C',
          'Misture os ingredientes secos',
          'Adicione os ingredientes líquidos',
          'Asse por 35-40 minutos'
        ],
        imagem: 'assets/bolo-chocolate-fit.svg'
      };
      
      setRecipe(mockRecipe);
      setLoading(false);
    };

    loadRecipe();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div>
        <header>
          <h1 className="logo">Tasty Cuisine</h1>
          <nav>
            <ul className="menu">
              <li><a href="index.html">Home</a></li>
              <li><a href="receitas.html">Receitas</a></li>
              <li><a href="bem-estar.html">Bem-Estar</a></li>
              <li><a href="guia-gastronomico.html">Guia Gastronômico</a></li>
              <li><a href="contato.html">Contato</a></li>
              <li><a href="perfil.html">Perfil</a></li>
            </ul>
          </nav>
        </header>
        <div className="hero">
          <img src="assets/bolo-chocolate-fit.svg" alt="Imagem da Receita" style={{width: '100%', height: '320px', objectFit: 'cover'}} />
          <h1 id="receita-nome">Carregando...</h1>
          <p>Uma receita deliciosa e saudável para você!</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return <div>Receita não encontrada</div>;
  }

  return (
    <div>
      <header>
        <h1 className="logo">Tasty Cuisine</h1>
        <nav>
          <ul className="menu">
            <li><a href="index.html">Home</a></li>
            <li><a href="receitas.html">Receitas</a></li>
            <li><a href="bem-estar.html">Bem-Estar</a></li>
            <li><a href="guia-gastronomico.html">Guia Gastronômico</a></li>
            <li><a href="contato.html">Contato</a></li>
            <li><a href="perfil.html">Perfil</a></li>
          </ul>
        </nav>
      </header>

      <div className="hero">
        <img src={recipe.imagem} alt="Imagem da Receita" style={{width: '100%', height: '320px', objectFit: 'cover'}} />
        <h1 id="receita-nome">{recipe.nome}</h1>
        <p>Uma receita deliciosa e saudável para você!</p>
      </div>

      <div className="info-bar">
        <span className="tag" id="receita-categoria">{recipe.categoria}</span>
        <span>⏱ <span id="receita-tempo">{recipe.tempo} min</span></span>
        <span>💧 <span id="receita-dificuldade">{recipe.dificuldade}</span></span>
        <span>❤ <span id="receita-favoritos">{recipe.favoritos}</span></span>
        <span id="estrelas">⭐⭐⭐⭐⭐</span>
        <span>(<span id="nota">{recipe.nota}</span>)</span>
      </div>

      <div className="container">
        <div className="ingredientes">
          <h2>Ingredientes</h2>
          <ul id="lista-ingredientes">
            {recipe.ingredientes.map((ingrediente, index) => (
              <li key={index}>{ingrediente}</li>
            ))}
          </ul>
        </div>

        <div className="preparo">
          <h2>Modo de Preparo</h2>
          <ol id="lista-preparo">
            {recipe.preparo.map((passo, index) => (
              <li key={index}>{passo}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="botao">
        <button id="btn-favorito" onClick={toggleFavorite}>
          <span id="favorito-icon">{isFavorite ? '❤️' : '🤍'}</span> 
          <span id="favorito-text">{isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</span>
        </button>
      </div>
    </div>
  );
};

export default ReceitaDetalhes;