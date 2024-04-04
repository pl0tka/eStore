const url = 'https://fakestoreapi.com/products/';

const fetchProducts = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const displayProducts = async () => {
  const fetchedProducts = await fetchProducts(url);

  const renderedProducts = fetchedProducts.map((product) => {
    const { title, image, price } = product;
    // temp class name
    return `<div class="product">
      <img src="${image}"/>
      <h3>${title}</h3>
      <p>PLN ${price}</p>
    </div>`;
  }).join``;

  const productsContainerDOM = document.querySelector('.products');
  productsContainerDOM.innerHTML = renderedProducts;
};

displayProducts();
