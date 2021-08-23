const divListagem = document.getElementById('listagem');


const listaProduto = (srcImagen, descricaoProduto, precoDoProduto)=>{
    const infoProduto = document.createElement('div');
    const imagem = document.createElement('img');
    const tituloProduto = document.createElement('h2');
    const precoProduto = document.createElement('div');

    infoProduto.classList.add('col-md-3');
    infoProduto.classList.add('info-produto');
    
    imagem.classList.add('rounded');
    imagem.classList.add('img_produto');
    imagem.classList.add('img_fluid');
    imagem.src = srcImagen;

    tituloProduto.className = 'desc_produto';
    tituloProduto.innerText = descricaoProduto.slice(0, 37) + '...';

    precoProduto.className = 'preco_produto';
    precoProduto.innerText = Intl.NumberFormat('pt-br',{style:'currency', currency: 'BRL'}).format(precoDoProduto);

    infoProduto.appendChild(imagem);
    infoProduto.appendChild(tituloProduto);
    infoProduto.appendChild(precoProduto);

    divListagem.appendChild(infoProduto);

}


const buscaProdutos = async (genero) => {
  const listaDeProdutos = await fetch(
    `https://api.mercadolibre.com/sites/MLB/search?q=${genero}`
  );
  const listaDeProdutosJson = await listaDeProdutos.json();
  listaDeProdutosJson.results.forEach((produto)=>{
    listaProduto(produto.thumbnail, produto.title, produto.price);
  })
};

window.onload = () => {
  buscaProdutos('camisas-infantil');
};
