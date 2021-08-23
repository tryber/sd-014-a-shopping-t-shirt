let listagemDeProdutos = [];

const divListagem = document.getElementById('listagem');
const listaGenero = document.getElementById('genero');
const listaOrdenacao = document.getElementById('ordem');
const filtro = document.getElementById('search');
const btnFiltro = document.getElementById('btn-search');


// filtrando no input
btnFiltro.addEventListener('click', () => {
  let textoFiltro = filtro.value; //peguei o valor do elemento
  // console.log(textoFiltro);
  filtrarProdutos(textoFiltro)

})

const filtrarProdutos = async (Textofiltro) => {
  listagemDeProdutos = listagemDeProdutos.filter((produto) => produto.title.toUpperCase().includes(Textofiltro.toUpperCase()));  // jogamos as letras em caixa baixa para fazer a comparação, isso é muito importante para o resultado final. 
  preencheListaDeProdutos();

  // peguei o meu proprio array e estou atualizando ele
} 




listaOrdenacao.addEventListener('change', async (event) => {
  let ordem = event.target.value;
  await ordenaPorPreco(ordem);
})

listaGenero.addEventListener('change', async (event) => {
  let genero = event.target.value;
  await buscaProdutos(genero);
})

const listaProduto = (srcImagen, descricaoProduto, precoDoProduto) => {
  const infoProduto = document.createElement('div');
  const imagem = document.createElement('img');
  const tituloProduto = document.createElement('h2');
  const precoProduto = document.createElement('div');

  infoProduto.classList.add('col-md-3')
  infoProduto.classList.add('info-produto')


  imagem.classList.add('rounded');
  imagem.classList.add('img_produto');
  imagem.classList.add('img_fluid');
  imagem.src = srcImagen;

  tituloProduto.className = 'desc_produto'
  // tituloProduto.innerHTML = descricaoProduto;
  tituloProduto.innerText = descricaoProduto.slice(0, 37) + '...'; //arrumou o testo dos produtos


  precoProduto.className = 'preco_produto';
  // precoProduto.innerHTML = precoDoProduto;
  precoProduto.innerText = Intl.NumberFormat('pt-br',{style:'currency', currency: 'BRL'}).format(precoDoProduto);


  infoProduto.appendChild(imagem);
  infoProduto.appendChild(tituloProduto);
  infoProduto.appendChild(precoProduto);

  divListagem.appendChild(infoProduto);
}


const ordenaPorPreco = (ordem) => {
  if(ordem === 'menor-preco') {
    listagemDeProdutos.sort((a,b) => a.price -b.price); // ordenando do maior para o menor
  }

  if(ordem === 'maior-preco') {
    listagemDeProdutos.sort((a,b) => b.price - a.price); // ordenando do maior para o menor
  }

  preencheListaDeProdutos();
};



// conectar com a API

// const buscaProdutos = () => {
//   fetch("https://api.mercadolibre.com/sites/MLB/search?q=$QUERY").then((resolve) => {
//     console.log(resolve);
//   }) 
// }

// transformando em json
// const buscaProdutos = () => {
//   fetch("https://api.mercadolibre.com/sites/MLB/search?q=$camiseta").then((resolve) => {
//     resolve.json().then((produtos) => {
//       console.log(produtos.results); // ressults são os dados da api que eu quero, pois não quero toda a api
//     })
//   }) 
// }

// transformando em json
//  usando com async -o code fica mais bonito


const preencheListaDeProdutos = () => {
  divListagem.innerHTML ="";
   // forEach vai passar pelo meu array results que estao dentro do json 
  listagemDeProdutos.forEach((produto) => {
  // console.log(produto.title, produto.price);
    listaProduto(produto.thumbnail, produto.title, produto.price)
  })
}



const buscaProdutos = async (genero) => {
  const listaDeProdutos = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${genero}`);
  const listaDeProdutosJson = await listaDeProdutos.json();
  // console.log(listaDeProdutosJson.results);  
  listagemDeProdutos = listaDeProdutosJson.results;
  preencheListaDeProdutos();
}

window.onload = () => {
  buscaProdutos('camisas-infantis');
}