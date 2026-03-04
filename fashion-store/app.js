document.addEventListener("DOMContentLoaded", () => {
  const pagina = window.location.pathname;

  if (pagina.includes("index.html") || pagina == "/") {
    CarregarDados();
  } else if (pagina.includes("menu.html")) {
    CarregarMenu();
    PreencherFiltros();
  }else if (pagina.includes("detail.html")) {
    CarregarDetails();
}
});

async function CarregarDados() {
  try {
    const Json = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=5');
    const resposta = await Json.json();
    const ListaCard = document.getElementById('featured-list');

    if (!ListaCard) return;
    ListaCard.innerHTML = '';

    resposta.forEach(item => {
      ListaCard.innerHTML += `
        <article class="card">
          <div class="card-img-wrapper">
            <img src="${item.images[0]}" alt="${item.description}" class="card-img">
          </div>
          <div class="card-content">
            <span class="card-category">${item.category.name}</span>
            <h3 class="card-title">${item.title}.</h3>
            <div class="card-footer">
              <span class="card-price">R$ ${item.price}</span>
              <a href="detail.html?id=${item.id}" class="btn-primary btn-small">ver detalhes</a>
            </div>
          </div>
        </article>`;
    });
  } catch (error) {
    console.log(error);
  }
}async function PreencherFiltros() {
  try {
    const resposta = await fetch('https://api.escuelajs.co/api/v1/categories?offset=0&limit=5');
    const categories = await resposta.json();
    const select = document.getElementById('category-filter');

    if (!select) return;

    categories.forEach(item => {
      select.innerHTML += `<option value="${item.id}">${item.name}</option>`;
    });

    select.addEventListener('change', (e) => {
      CarregarMenu(e.target.value);
    });

  } catch (error) {
    console.log(error);
  }
}

async function CarregarMenu(idCategoria = "") {
  try {
    let url = 'https://api.escuelajs.co/api/v1/products';
    
    if (idCategoria !== "") {
      url = `https://api.escuelajs.co/api/v1/products/?categoryId=${idCategoria}`;
    }

    const response = await fetch(url);
    const resposta = await response.json();
    
    const ListaCard = document.getElementById('products-list');

    if (!ListaCard) return;
    ListaCard.innerHTML = '';

    resposta.forEach(item => {
      ListaCard.innerHTML += `
      <article class="card">
        <div class="card-img-wrapper">
          <img src="${item.images[0]}" alt="${item.description}" class="card-img" onerror="this.src='https://placehold.co/600x400?text=Imagem+Indisponível'">
        </div>
        <div class="card-content">
          <span class="card-category">${item.category.name}</span>
          <h3 class="card-title">${item.title}.</h3>
          <div class="card-footer">
            <span class="card-price">R$ ${item.price}</span>
            <a href="detail.html?id=${item.id}" class="btn-primary btn-small">ver detalhes</a>
          </div>
        </div>
      </article>`;
    });
  } catch (error) {
    console.log(error);
  }
}
async function CarregarDetails(){

try{
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  

  const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
  const item = await response.json();


  const container = document.getElementById('product-detail');



container.innerHTML = `
<img src="${item.images[0]}" alt="${item.title}" class="detail-img" onerror="this.src='https://placehold.co/600x400'">
<div class="detail-info">
  <span class="card-category" style="font-size:1rem; margin-bottom:1rem; display:block;">Categoria: ${item.category.name}</span>
  <h1>${item.title}</h1>
  <div class="detail-price">R$ ${item.price}</div>
  <p class="detail-description">${item.description}</p>
  <button class="btn-primary">Adicionar ao Carrinho</button>
</div>
`;


}catch(error){
  console.log(error)
}


}