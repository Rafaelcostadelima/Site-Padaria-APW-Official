import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// --- DADOS DOS PRODUTOS ---
const produtos = [
  { id: 1, nome: "Pão francês", preco: "R$ 1,99 unid", precoNum : 1.99, img: "img/cesta-de-pao.png", desc: "Este é um pão francês tradicional, feito de forma caseira e cheia de amor." },
  { id: 2, nome: "Pão italiano", preco: "R$ 2,99 unid", precoNum : 2.99, img: "img/pao-italiano.jpg", desc: "Este é um pão italiano feito de forma única. Apesar de seu tamanho ser comum, seu sabor é inigualável." },
  { id: 3, nome: "Sonho", preco: "R$ 4,99 unid", precoNum : 4.99, img: "img/sonho.png", desc: (<>Nosso sonho caseiro é deliciosamente incomparável.<br />As opções de recheio são:<ul><li>Creme de Baunilha</li><li>Doce de Leite</li></ul></>) },
  { id: 4, nome: "Pão de Queijo", preco: "R$ 3,50 unid", precoNum: 3.50, img: "img/pao-de-queijo.jpg", desc: (<>O legítimo sabor mineiro. Crocante por fora e "puxa-puxa" por dentro.<br /><br /><strong>Ingredientes:</strong><ul><li>Polvilho azedo e doce</li><li>Queijo Minas curado</li><li>Ovos e leite fresco</li></ul></>) },
  { id: 5, nome: "Coxinha de Frango", preco: "R$ 6,90 unid", precoNum: 6.90, img: "img/coxinha-de-frango.jpg", desc: (<>A rainha dos salgados. Massa de batata macia e muito recheio.<br /><br /><strong>Detalhes:</strong><ul><li>Frango desfiado temperado</li><li>Requeijão cremoso (Catupiry)</li><li>Empanada e frita na hora</li></ul></>) },
  { id: 6, nome: "Croissant", preco: "R$ 8,90 unid", precoNum: 8.90, img: "img/croissant.jpg", desc: (<>Receita francesa original. Massa folhada com muitas camadas de manteiga.<br /><br />Perfeito puro ou com geleia de frutas vermelhas.</>) },
  { id: 7, nome: "Carolina Recheada", preco: "R$ 3,00 unid", precoNum: 3.00, img: "img/carolina-recheada.jpg", desc: (<>Pequenas delícias para adoçar o dia.<br /><br />Massa choux leve, recheada com muito doce de leite e chocolate.</>) },
  { id: 8, nome: "Bauru de Forno", preco: "R$ 7,50 unid", precoNum: 7.50, img: "img/bauru-de-forno.jpg", desc: (<>Salgado assado, leve e muito saboroso.<br /><br /><strong>Recheio:</strong><ul><li>Presunto magro</li><li>Queijo mussarela derretido</li><li>Rodela de tomate e orégano</li></ul></>) },
];

const bolos = [
  { id: 10, nome: "Bolo de Chocolate", preco: "R$ 5,99 a fatia", precoNum: 5.99, img: "img/bolo-chocolate.jpg", desc: (<>Massa fofinha de cacau 100%.<br /><strong>Cobertura:</strong> Ganache de chocolate meio amargo.</>) },
  { id: 11, nome: "Bolo de Cenoura", preco: "R$ 6,99 a fatia", precoNum: 6.99, img: "img/bolo-cenoura.jpg", desc: (<>O clássico brasileiro, bem amarelinho.<br /><strong>Cobertura:</strong> Casquinha de chocolate crocante.</>) },
  { id: 12, nome: "Bolo de Prestígio", preco: "R$ 6,49 a fatia", precoNum: 6.49, img: "img/bolo-prestigio.jpg", desc: (<>Bolo de chocolate com um recheio de prestígio.<br /><strong>Cobertura:</strong> Prestígio cremoso com flocos de coco.</>) },
  { id: 13, nome: "Bolo de Laranja", preco: "R$ 5,49 a fatia", precoNum: 5.49, img: "img/bolo-laranja.jpg", desc: (<>Bolo seco, perfeito para o café da tarde.<br />Feito com suco da fruta natural.</>) },
  { id: 14, nome: "Bolo Formigueiro", preco: "R$ 5,49 a fatia", precoNum: 5.49, img: "img/bolo-formigueiro.jpg", desc: (<>Massa de baunilha com granulado de chocolate na massa.<br />Simples, seco e nostálgico.</>) }
];

const todosProdutos = [...produtos, ...bolos];

// --- ÍCONES ---
const ThumbUp = ({ active }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>;
const ThumbDown = ({ active }) => <svg width="24" height="24" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"/></svg>;
const MenuIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const CloseIcon = () => <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const InstaIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const WhatsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MapPinIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="#E74C3C" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const CheckCircleIcon = () => <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

function App() {
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [telaCarrinho, setTelaCarrinho] = useState(false);
  const [telaFeedback, setTelaFeedback] = useState(false);
  const [telaSobre, setTelaSobre] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  const [avaliacao, setAvaliacao] = useState(null); 
  const [carrinho, setCarrinho] = useState([]); 
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  
  const [mostrarOpcoesAdicionar, setMostrarOpcoesAdicionar] = useState(false);
  const [itemParaAdicionarQtd, setItemParaAdicionarQtd] = useState(null); 
  const [quantidadeInput, setQuantidadeInput] = useState(1); 

  // ESTADO DA NOTIFICAÇÃO (TOAST)
  const [notificacao, setNotificacao] = useState(null);

  const carouselRef = useRef();
  const [width, setWidth] = useState(0);

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xdkrkznk"; 

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const trilha = container.firstChild; 
        const novaLargura = trilha.scrollWidth - container.offsetWidth;
        setWidth(novaLargura > 0 ? novaLargura + 20 : 0);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    const t = setTimeout(updateWidth, 500);
    return () => { window.removeEventListener('resize', updateWidth); clearTimeout(t); };
  }, [telaCarrinho, telaFeedback, menuAberto, telaSobre, pedidoConfirmado]);

  // --- FUNÇÕES ---
  const valorTotal = carrinho.reduce((acc, item) => acc + item.precoNum, 0);

  // Função auxiliar para mostrar o toast
  const dispararNotificacao = (produto) => {
    setNotificacao(produto); // Define qual produto mostrar
    // O setTimeout do fechamento será controlado automaticamente pelo AnimatePresence ou useEffect se quisesse, 
    // mas aqui vou deixar o onAnimationComplete do Framer Motion cuidar disso ou um timer simples.
    setTimeout(() => {
        setNotificacao(null);
    }, 3000);
  };

  const adicionarAoCarrinho = (produto) => {
    setCarrinho([...carrinho, produto]); 
    dispararNotificacao(produto); // MOSTRA A NOTIFICAÇÃO
    // NÃO ABRE MAIS A TELA DO CARRINHO AUTOMATICAMENTE
  };

  const manipularQuantidade = (acao) => {
    if (acao === 'adicionar') {
      setMostrarOpcoesAdicionar(true);
    } else if (acao === 'remover' && carrinho.length > 0) {
      const novo = [...carrinho];
      novo.pop();
      setCarrinho(novo);
    }
  };

  const selecionarProdutoParaQtd = (produto) => {
    setItemParaAdicionarQtd(produto);
    setQuantidadeInput(1); 
  };

  const confirmarAdicaoQtd = () => {
    if (itemParaAdicionarQtd && quantidadeInput > 0) {
      const novosItens = Array(Number(quantidadeInput)).fill(itemParaAdicionarQtd);
      setCarrinho([...carrinho, ...novosItens]);
      
      dispararNotificacao(itemParaAdicionarQtd); // MOSTRA A NOTIFICAÇÃO
      
      setItemParaAdicionarQtd(null);
      setMostrarOpcoesAdicionar(false);
    }
  };

  const finalizarPedido = () => {
    if (carrinho.length === 0) return; 
    setTelaCarrinho(false); 
    setPedidoConfirmado(true); 
    setCarrinho([]); 
  };

  const handleVoltar = () => {
    if (telaCarrinho) setTelaCarrinho(false);
    else if (telaFeedback) { setTelaFeedback(false); setSucesso(false); }
    else if (telaSobre) setTelaSobre(false);
    else if (pedidoConfirmado) setPedidoConfirmado(false);
    else setProdutoSelecionado(null);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const formData = new FormData(e.target);
    if (avaliacao) formData.append('Avaliacao', avaliacao === 'like' ? 'Gostei 👍' : 'Não gostei 👎');
    try {
        const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', body: JSON.stringify(Object.fromEntries(formData)), headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' } });
        if (response.ok) { setSucesso(true); e.target.reset(); setAvaliacao(null); } 
        else { alert("Erro ao enviar. Tente novamente."); }
    } catch (error) { alert("Erro de conexão."); } 
    finally { setEnviando(false); }
  };

  const navegar = (destino) => {
    setTelaCarrinho(false);
    setTelaFeedback(false);
    setTelaSobre(false);
    setPedidoConfirmado(false); 
    setMenuAberto(false);
    setProdutoSelecionado(null);
    setSucesso(false); 
    if (destino === 'carrinho') setTelaCarrinho(true);
    if (destino === 'feedback') setTelaFeedback(true);
    if (destino === 'sobre') setTelaSobre(true);
  };

  return (
    <div className="app-container">
      {/* NOTIFICAÇÃO TOAST (FIXA NO TOPO ESQUERDO) */}
      <AnimatePresence>
        {notificacao && (
          <motion.div 
            className="toast-notification"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            key={Date.now()} // Garante que reinicia se clicar rápido
          >
            <div className="toast-content">
                <img src={notificacao.img} alt={notificacao.nome} />
                <p>O produto <strong>{notificacao.nome}</strong> foi adicionado ao carrinho!</p>
            </div>
            {/* BARRINHA DE PROGRESSO */}
            <motion.div 
                className="toast-progress"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <header>
        <div className="header-content">
          {(produtoSelecionado || telaCarrinho || telaFeedback || telaSobre || pedidoConfirmado) ? (
            <motion.button className="btn-voltar" onClick={handleVoltar} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} whileTap={{ scale: 0.9 }}>← Voltar</motion.button>
          ) : (
            <>
              <nav className="menu-desktop">
                 <a href="#" onClick={() => navegar('home')}>Início</a>
                 <a href="#" onClick={() => navegar('sobre')}>Sobre Nós</a>
                 <a href="#" onClick={() => navegar('carrinho')}>Carrinho ({carrinho.length})</a>
                 <a href="#" onClick={() => navegar('feedback')}>Feedback</a>
              </nav>
              <button className="btn-menu-mobile" onClick={() => setMenuAberto(true)}><MenuIcon /></button>
            </>
          )}
          <div className="logo-center"><img src="img/imagem-da-padaria.png" alt="Logo" /><span className="logo-text">Riba City</span></div>
        </div>
      </header>

      <AnimatePresence>
        {menuAberto && (
          <>
            <motion.div className="menu-overlay-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuAberto(false)}/>
            <motion.div className="mobile-menu-drawer" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <div className="drawer-header"><h3>Menu</h3><button onClick={() => setMenuAberto(false)}><CloseIcon /></button></div>
              <ul className="drawer-links">
                <li onClick={() => navegar('home')}>🏠 Início</li>
                <li onClick={() => navegar('sobre')}>🥐 Sobre Nós</li>
                <li onClick={() => navegar('carrinho')}>🛒 Carrinho ({carrinho.length})</li>
                <li onClick={() => navegar('feedback')}>💬 Feedback</li>
              </ul>
              <div className="drawer-footer"><p>Padaria Riba City © 2025</p></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          {pedidoConfirmado ? (
            <motion.div key="pedido-sucesso" className="pedido-sucesso-container" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="icon-check-grand"><CheckCircleIcon /></div>
              <h2>Seu pedido foi confirmado!</h2><p>Agradecemos a preferência. Prepare-se para comer bem!</p>
              <button className="btn-finalizar" onClick={() => navegar('home')}>Voltar ao Início</button>
            </motion.div>
          ) : telaSobre ? (
            <motion.div key="sobre" className="sobre-container" initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} exit={{opacity:0, y:30}}>
              <div className="sobre-esquerda">
                <div className="card--da-loja"><img src="img/fachada-da-loja.jpg" alt="Fachada" className="img-fachada"/><div className="endereco-box"><MapPinIcon /><p>Rua Dr. Ricardo Gonçalves, 170</p></div></div>
              </div>
              <div className="sobre-direita">
                <div className="botoes-contato"><a href="" target="_blank" rel="noreferrer" className="btn-social instagram"><div className="icon-social"><InstaIcon /></div><span>@Padaria_RibaCity</span></a><a href="" target="_blank" rel="noreferrer" className="btn-social whatsapp"><div className="icon-social"><WhatsIcon /></div><span>11 90835-4792</span></a></div>
                <div className="card-donos"><h3>Donos</h3><ul><li>Pablo</li><li>Maria Eduarda</li><li>Lívia Maria</li><li>Matheus Fabri</li><li>Yasmin</li></ul></div>
                <div className="logo-sobre"><img src="img/imagem-da-padaria.png" alt="Logo" /></div>
              </div>
            </motion.div>
          ) : telaFeedback ? (
             <motion.div key="feedback" className={`feedback-container ${sucesso ? 'container-sucesso' : ''}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}>
                {sucesso ? (
                    <div className="feedback-sucesso"><h2>Obrigado! 🎉</h2><div className="texto-sucesso"><p>Somos extremamente gratos pela sua avaliação.</p><p>Todas as críticas e comentários são muito bem-vindos!</p></div><button className="btn-finalizar" onClick={() => navegar('home')}>Voltar para o início</button></div>
                ) : (
                    <>
                        <div className="feedback-header"><h2>Sua opinião importa!</h2><p>Ajude a Padaria Riba City a melhorar.</p></div>
                        <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
                        <div className="input-group"><input type="text" name="nome" placeholder="Seu nome*" required /></div>
                        <div className="input-group"><input type="email" name="email" placeholder="Seu email*" required /></div>
                        <div className="input-group message-group"><p className="label-mensagem">Mensagem</p><div className="textarea-container"><textarea name="mensagem" placeholder="Escreva a sua mensagem aqui...*" required></textarea><div className="avaliacao-icons"><motion.button type="button" className={`icon-btn ${avaliacao==='like'?'active-like':''}`} onClick={()=>setAvaliacao('like')} whileTap={{scale:1.2}}><ThumbUp active={avaliacao==='like'}/></motion.button><motion.button type="button" className={`icon-btn ${avaliacao==='dislike'?'active-dislike':''}`} onClick={()=>setAvaliacao('dislike')} whileTap={{scale:1.2}}><ThumbDown active={avaliacao==='dislike'}/></motion.button></div></div></div>
                        <motion.button className="btn-enviar" whileHover={{scale:1.02}} whileTap={{scale:0.95}} disabled={enviando}>{enviando ? "Enviando..." : "Enviar Feedback"}</motion.button>
                        </form>
                    </>
                )}
             </motion.div>
          ) : telaCarrinho ? (
            <motion.div key="carrinho" className="carrinho-container" initial={{y:50, opacity:0}} animate={{y:0, opacity:1}} exit={{y:50, opacity:0}}>
              <div className="carrinho-header"><h2>Meu Pedido</h2></div>
              <div className="carrinho-body">
                <div className="linha-info"><span className="label">Itens:</span><ul className="lista-pedidos">{carrinho.length===0?(<li>Carrinho vazio...</li>):(carrinho.map((item,i)=>(<li key={i}>{item.nome}</li>)))}</ul></div>
                <div className="linha-info linha-botoes"><span className="label">Produto:</span><div className="botoes-qtd"><button onClick={()=>manipularQuantidade('remover')}>-</button><button onClick={()=>manipularQuantidade('adicionar')}>+</button></div></div>
                <div className="linha-total"><span className="label">Total:</span><span className="valor">R$ {valorTotal.toFixed(2).replace('.', ',')}</span></div>
                <div className="campo-obs"><label>Observações:</label><input type="text" placeholder="Ex: Tirar cebola, aquecer..." /></div>
                <motion.button className="btn-finalizar" whileTap={{scale:0.95}} onClick={finalizarPedido}>Confirmar Pedido</motion.button>
              </div>
              <AnimatePresence>
                {mostrarOpcoesAdicionar && !itemParaAdicionarQtd && (
                  <motion.div className="modal-adicionar-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMostrarOpcoesAdicionar(false)}>
                    <motion.div className="modal-adicionar-content" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                      <h3>Escolha o que adicionar:</h3>
                      <div className="lista-produtos-extra">
                        {todosProdutos.map((p) => (
                          <div className="card-extra" key={p.id} onClick={() => selecionarProdutoParaQtd(p)}>
                            <img src={p.img} alt={p.nome} /><p>{p.nome}</p><span>{p.preco}</span>
                          </div>
                        ))}
                      </div>
                      <button className="btn-cancelar-extra" onClick={() => setMostrarOpcoesAdicionar(false)}>Cancelar</button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {itemParaAdicionarQtd && (
                  <motion.div className="modal-qtd-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setItemParaAdicionarQtd(null)}>
                    <motion.div className="modal-qtd-content" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
                       <h3>Quantos itens?</h3>
                       <div className="info-produto-qtd"><img src={itemParaAdicionarQtd.img} alt={itemParaAdicionarQtd.nome} /><p>{itemParaAdicionarQtd.nome}</p></div>
                       <div className="controle-qtd-grande"><button onClick={() => setQuantidadeInput(Math.max(1, quantidadeInput - 1))}>-</button><span>{quantidadeInput}</span><button onClick={() => setQuantidadeInput(quantidadeInput + 1)}>+</button></div>
                       <div className="botoes-qtd-confirmar"><button className="btn-cancelar" onClick={() => setItemParaAdicionarQtd(null)}>Cancelar</button><button className="btn-confirmar" onClick={confirmarAdicaoQtd}>Confirmar</button></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : !produtoSelecionado ? (
            <motion.div key="lista" className="container-lista" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:0.3}}>
              <motion.h2 className="section-title">Receitas Fresquinhas</motion.h2>
              <div className="product-grid">
                {produtos.map((produto)=>(<motion.div className="card-inicial" key={produto.id} whileHover={{y:-5}} whileTap={{scale:0.98}}><div className="card-img-wrapper"><img src={produto.img} alt={produto.nome}/></div><h3>{produto.nome}</h3><span className="card-price-tag">{produto.preco}</span><button className="btn-ver-detalhes" onClick={()=>setProdutoSelecionado(produto)}>Ver Detalhes</button></motion.div>))}
              </div>
              <motion.h2 className="section-title" style={{marginTop:'40px'}}>Bolos da Casa</motion.h2>
              <p className="hint-scroll">Arraste para o lado →</p>
              <motion.div className="carousel-container" ref={carouselRef}><motion.div className="carousel-inner" drag="x" dragConstraints={{right:0, left:-width}} whileTap={{cursor:"grabbing"}}>{bolos.map((bolo)=>(<motion.div className="card-bolo" key={bolo.id} whileTap={{scale:0.98}}><img src={bolo.img} alt={bolo.nome}/><div className="bolo-info"><h3>{bolo.nome}</h3><span className="bolo-preco">{bolo.preco}</span><button className="btn-ver-detalhes" onClick={()=>setProdutoSelecionado(bolo)}>Ver</button></div></motion.div>))}</motion.div></motion.div>
            </motion.div>
          ) : (
            <motion.div key="detalhe" className="detalhe-container" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:20}}>
              <div className="card-branco">
                <div className="lado-texto"><div className="descricao-conteudo">{produtoSelecionado.desc}</div></div>
                <div className="lado-painel-cinza"><div className="img-frame"><img src={produtoSelecionado.img} alt={produtoSelecionado.nome}/></div><h2>{produtoSelecionado.nome}</h2><span className="preco-destaque">{produtoSelecionado.preco}</span><motion.button className="btn-comprar-final" whileTap={{scale:0.9}} onClick={()=>adicionarAoCarrinho(produtoSelecionado)}>Adicionar ao carrinho</motion.button></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer><p>&copy; 2025 Padaria Riba City. Todos os direitos reservados.</p></footer>
    </div>
  );
}

export default App;