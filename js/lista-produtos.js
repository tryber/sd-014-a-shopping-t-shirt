// Array para armazenar as informações recebidas da API e facilitar
// a busca e ordenação de dados
let listagemDeProdutos = [];

// Guarda dos elementos do HTML que precisam ser monitorados
// e ou modificados via código JavaScript
const divListagem = document.getElementById('listagem');
const listaGenero = document.getElementById('genero');
const listaOrdenacao = document.getElementById('ordem');
const filtro = document.getElementById('search');

const btnFiltro = document.getElementById('btn-search');

// Função para criar o elemento img de cada produto
// dessa forma deixamos a função ListaProduto menor
// e o código fica mais organizado e distribuido
const criaImagemProduto = (src) => {
  const imagem = document.createElement('img');
  imagem.classList.add('rounded');
  imagem.classList.add('img_produto');
  imagem.classList.add('img_fluid');
  imagem.src = src;

  return imagem;
};

const criaDescricaoProduto = (descricao) => {
  const descricaoProduto = document.createElement('p');

  descricaoProduto.classList.add('desc_produto');
  descricaoProduto.innerText = `${descricao.slice(0, 37)}...`;

  return descricaoProduto;
};

const criaPrecoProduto = (preco) => {
  const precoProduto = document.createElement('div');
  precoProduto.className = 'preco_produto';
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
  precoProduto.innerText = Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
  }).format(preco);

  return precoProduto;
};

// Função que cria cada bloco de informação de produto e coloca na
// div pai preenchendo a página com as informações
// eslint-disable-next-line max-lines-per-function
const listaProduto = (srcImagen, descricaoProduto, precoDoProduto) => {
  const infoProduto = document.createElement('div');

  infoProduto.classList.add('col-md-3');
  infoProduto.classList.add('info-produto');

  infoProduto.appendChild(criaImagemProduto(srcImagen));
  infoProduto.appendChild(criaDescricaoProduto(descricaoProduto));
  infoProduto.appendChild(criaPrecoProduto(precoDoProduto));

  divListagem.appendChild(infoProduto);
};

const preencheListaDeProdutos = () => {
  divListagem.innerHTML = '';
  listagemDeProdutos.forEach((produto) => {
    listaProduto(produto.thumbnail, produto.title, produto.price);
  });
};

const filtrarProdutos = (Textofiltro) => {
  listagemDeProdutos = listagemDeProdutos.filter((produto) =>
    produto.title.toUpperCase().includes(Textofiltro.toUpperCase())
  );
  preencheListaDeProdutos();
};

btnFiltro.addEventListener('click', () => {
  filtrarProdutos(filtro.value);
});

const ordenaPorPreco = (ordem) => {
  if (ordem === 'menor-preco') {
    listagemDeProdutos.sort((a, b) => a.price - b.price);
  }
  if (ordem === 'maior-preco') {
    listagemDeProdutos.sort((a, b) => b.price - a.price);
  }
  preencheListaDeProdutos();
};

listaOrdenacao.addEventListener('change', async (event) => {
  await ordenaPorPreco(event.target.value);
});

const buscaProdutos = async (genero) => {
  const listaDeProdutos = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${genero}`
  );
  const listaDeProdutosJson = await listaDeProdutos.json();
  listagemDeProdutos = listaDeProdutosJson.results;
};

listaGenero.addEventListener('change', async (event) => {
  filtro.value = "";
  listaOrdenacao.value = 'relevancia';
  await buscaProdutos(event.target.value);
  preencheListaDeProdutos();
});

window.onload = async () => {
  await buscaProdutos('camisas-infantil');
  preencheListaDeProdutos();
};
