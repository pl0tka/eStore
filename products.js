import './navbarInteractions.js';

import { getElement, getStorageItem } from './utils.js';
import { displayTotalProductCount } from './common.js';

// API all products
const url = 'https://fakestoreapi.com/products/';

// DOM selections
const productsContainer = getElement('.products__inner');
const totalProductCount = getElement('.nav__cart-count');

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
    <div class="product__img-box">
    <img src="${image}" alt="${image}" class="product__img" /></div>
    <h3 class="product__title">${title}</h3>
    <p class="product__price">${price} PLN</p>
    <button
      class="btn product__add-to-cart-btn"
      data-id="${id}">
      add to cart
    </button>
  </article>`;
  }).join``;

  containerDOM.innerHTML = renderedProducts;
};

const displayFetchedProducts = async () => {
  const products = await fetchProducts(url);
  renderProducts(products, productsContainer);

  // ADD PRODUCT TO CART
  const addToCartBtns = document.querySelectorAll('.product__add-to-cart-btn');
  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      // LOCAL STORAGE OPERATIONS
      // check if storage is empty
      let cart = getStorageItem('cart');
      // check if selected product is in storage
      const productInCart = cart.find((product) => product.id === productId);
      // set product to add
      if (!productInCart) {
        cart.push({ ...selectedProduct, count: 1 });
      } else {
        cart = cart.map((product) => {
          if (product.id === productId) {
            return { ...selectedProduct, count: productInCart.count + 1 };
          } else {
            return product;
          }
        });
      }
      // add cart to storage
      localStorage.setItem('cart', JSON.stringify(cart));

      // set amount of products in cart (icon)
      displayTotalProductCount(cart, totalProductCount);
    });
  });
};

displayFetchedProducts();

// set amount of products in cart (icon)
let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [];
}
displayTotalProductCount(cart, totalProductCount);
