let listagemDeProdutos = [];

const divListagem = document.getElementById("listagem");
const listaGenero = document.getElementById("genero");
const listaOrdenacao = document.getElementById("ordem");
const filtro = document.getElementById('search');

const btnFiltro = document.getElementById('btn-search');

btnFiltro.addEventListener('click', ()=>{
    filtrarProdutos(filtro.value);
});

const filtrarProdutos =  (Textofiltro) =>{
    listagemDeProdutos = listagemDeProdutos.filter((produto)=> produto.title.toUpperCase().includes(Textofiltro.toUpperCase()));
    preencheListaDeProdutos();
}

listaOrdenacao.addEventListener("change", async (event) => {
  await ordenaPorPreco(event.target.value);
});

listaGenero.addEventListener("change", (event) => {
  let genero = event.target.value;
  console.log(genero);
  filtro.value = '';
  listaOrdenacao.value = 'relevancia';
  buscaProdutos(genero);
});

const listaProduto = (srcImagen, descricaoProduto, precoDoProduto) => {
  const infoProduto = document.createElement("div");
  const imagem = document.createElement("img");
  const tituloProduto = document.createElement("h2");
  const precoProduto = document.createElement("div");

  infoProduto.classList.add("col-md-3");
  infoProduto.classList.add("info-produto");

  imagem.classList.add("rounded");
  imagem.classList.add("img_produto");
  imagem.classList.add("img_fluid");
  imagem.src = srcImagen;

  tituloProduto.className = "desc_produto";
  tituloProduto.innerText = descricaoProduto.slice(0, 37) + "...";

  precoProduto.className = "preco_produto";
  precoProduto.innerText = Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(precoDoProduto);

  infoProduto.appendChild(imagem);
  infoProduto.appendChild(tituloProduto);
  infoProduto.appendChild(precoProduto);

  divListagem.appendChild(infoProduto);
};

const ordenaPorPreco = (ordem) => {
  if (ordem === "menor-preco") {
    listagemDeProdutos.sort((a, b) => a.price - b.price);
  }
  if (ordem === "maior-preco") {
    listagemDeProdutos.sort((a, b) => b.price - a.price);
  }
  preencheListaDeProdutos();
};

const preencheListaDeProdutos = () => {
  divListagem.innerHTML = "";
  listagemDeProdutos.forEach((produto) => {
    listaProduto(produto.thumbnail, produto.title, produto.price);
  });
};

const buscaProdutos = async (genero) => {
  const listaDeProdutos = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${genero}`
  );
  const listaDeProdutosJson = await listaDeProdutos.json();
  listagemDeProdutos = listaDeProdutosJson.results;
  preencheListaDeProdutos();
};

window.onload = () => {
  buscaProdutos("camisas-infantil");
};
