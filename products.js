// API all products
const url = 'https://fakestoreapi.com/products/';

const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`The selector "${selection}" does not exist`);
};
// DOM selections
const productsContainer = getElement('.products__inner');

// FETCH PRODUCTS
const fetchProducts = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// RENDER PRODUCTS
const renderProducts = (products, containerDOM) => {
  const renderedProducts = products.map((product) => {
    const { id, title, image, price } = product;
    return `<article class="product">
    <img src="${image}" alt="${image}" class="product__img" />
    <h3 class="product__title">${title}</h3>
    <p class="product__price">${price} PLN</p>
    <button
      class="btn product__add-to-cart-btn"
      data-id="${id}"
    >
      add to cart
    </button>
  </article>`;
  }).join``;

  containerDOM.innerHTML = renderedProducts;
};

const displayFetchedProducts = async () => {
  const products = await fetchProducts(url);
  renderProducts(products, productsContainer);
};

displayFetchedProducts();
