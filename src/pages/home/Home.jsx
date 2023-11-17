import React from 'react';
import './Home.css';
import ProdutoNotificacaoWebSocket from '../../components/produto-notificacao/ProdutoNotificacaoWebSocket';

const Home = () => {
  return (
    <div className="home">
      <h1>Bem-vindo à Página Inicial da sua Loja Virtual</h1>
      <ProdutoNotificacaoWebSocket />
      <p>Conteúdo....</p>
	  <div className="card">
	  </div>
    
    </div>
  );
};

export default Home;