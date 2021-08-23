const divListagem = document.getElementById('listagem');

const listaProdutos = (srcImagen, descricaoProduto, precoProdutoo) => {
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
  tituloProduto.innerHTML = descricaoProduto.slice(0, 37) + '...'; //arrumou o testo dos produtos


  precoProduto.className = 'preco_produto';
  precoProduto.innerHTML = precoProdutoo;
  precoProduto.innerHTML = Intl.NumberFormat('pt-br', {style:'currency', currency: 'BRL'}).format(precoProdutoo);


  infoProduto.appendChild(imagem);
  infoProduto.appendChild(tituloProduto);
  infoProduto.appendChild(precoProduto);

  divListagem.appendChild(infoProduto);
}





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
const buscaProdutos = async (genero) => {
  const listaDeProdutos = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${genero}`);
  const listaDeProdutosJson = await listaDeProdutos.json();
  // console.log(listaDeProdutosJson.results);
  // forEach vai passar pelo meu array results que estao dentro do json 
  listaDeProdutosJson.results.forEach((produto) => {
  // console.log(produto.title, produto.price);
    listaProduto(produto.thumbnail, produto.title, produto.price)
  })
}

window.onload = () => {
  buscaProdutos('camisas-infantis');
}