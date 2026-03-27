import React from 'react';
import Header from './header';
import './css/sobre.css';

const Sobre: React.FC = () => {
  return (
    <div>
      <Header />

      <main className="sobre-container">
        {/* Título centralizado */}
        <section className="titulo-secao">
          <h1>Sobre a Tasty Cuisine</h1>
          <p className="subtitulo">Transformando a alimentação saudável em uma experiência deliciosa e acessível para todos.</p>
        </section>

        {/* Seção com foto e missão */}
        <section className="missao-secao">
          <div className="foto-container">
            <img src="assets/TastyCuisine.jpeg" alt="Logo coração Tasty Cuisine" />
          </div>
          <div className="missao-texto">
            <h2>Nossa Missão</h2>
            <p>O Tasty Cuisine foi criado com o propósito de tornar a alimentação saudável mais acessível, prazerosa e cheia de sabor. Acreditamos que cozinhar com carinho transforma qualquer refeição em um momento especial.</p>
          </div>
        </section>

        {/* Cards de valores */}
        <section className="valores-secao">
          <div className="valor-card">
            <div className="icone">❤️</div>
            <h3>Paixão por Sabor</h3>
            <p>Cada receita é criada com amor e dedicação para proporcionar experiências gastronômicas únicas e saborosas.</p>
          </div>
          <div className="valor-card">
            <div className="icone">🌿</div>
            <h3>Ingredientes Naturais</h3>
            <p>Priorizamos ingredientes frescos e naturais, respeitando a origem e qualidade de cada alimento.</p>
          </div>
          <div className="valor-card">
            <div className="icone">💡</div>
            <h3>Inovação e Criatividade</h3>
            <p>Combinamos tradição culinária com técnicas inovadoras para criar receitas surpreendentes e nutritivas.</p>
          </div>
        </section>

        {/* Nossa História */}
        <section className="historia-secao">
          <h2>Nossa História</h2>
          <p>Com receitas nutritivas, simples e deliciosas, queremos inspirar pessoas de todas as idades a explorar o mundo da culinária saudável, sem abrir mão do sabor. Aqui, você encontrará dicas, receitas e ingredientes que vão te ajudar a fazer escolhas mais conscientes e equilibradas no dia a dia, respeitando suas preferências alimentares.</p>
          <p>Nossa missão é mostrar que cuidar da saúde pode (e deve!) ser leve, colorido e muito gostoso.</p>
          <p className="assinatura">Com amor, Tasty Cuisine 💜</p>
        </section>

        {/* App Mobile */}
        <section className="app-mobile-secao">
          <div className="app-aviso">
            <div className="app-icone">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <div className="app-texto">
              <h3>📱 App Mobile Disponível!</h3>
              <p>Leve a Tasty Cuisine sempre com você! Nosso aplicativo mobile está disponível para download e oferece todas as funcionalidades do site na palma da sua mão.</p>
              <div className="app-botoes">
                <a href="#" className="btn-app">
                  <i className="fab fa-apple"></i> App Store
                </a>
                <a href="#" className="btn-app">
                  <i className="fab fa-google-play"></i> Google Play
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Sobre;