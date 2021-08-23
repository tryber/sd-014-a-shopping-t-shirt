const divListagem = document.getElementById('listagem');


const listaProdutos = () => {
  const infoProduto = document.createElement('div');
  const imagem = document.createElement('img');
  const tituloProduto = document.createElement('h2');
  const precoProduto = document.createElement('div');

  imagem.classList.add('rounded');
  imagem.classList.add('img_produto');
  imagem.classList.add('img_fluid');

  tituloProduto.className = 'desc_produto'

  precoProduto.className = 'preco_produto'

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
}

window.onload = () => {
  buscaProdutos('camisas-infantis');
}