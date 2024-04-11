import './navbarInteractions.js';

import { getElement, getStorageItem, setStorageItem } from './utils.js';
import { displayTotalProductCount } from './common.js';
import { renderAllProducts } from './renderAllProducts.js';
import { fetchProducts } from './fetchProducts.js';
import { addToCart } from './addProductToCart.js';
import { renderModal } from './renderModal.js';

// API all products
const url = 'https://fakestoreapi.com/products/';

// DOM selections
const productsContainer = getElement('.products__inner');
const totalProductCount = getElement('.nav__cart-count');

const displayFetchedProducts = async () => {
  const products = await fetchProducts(url);
  renderAllProducts(products, productsContainer);

  // DOM selections
  const addToCartBtns = document.querySelectorAll('.product__add-to-cart-btn');
  const infoBtns = document.querySelectorAll('.product__info-btn');

  // ADD PRODUCT TO CART
  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const selectedProduct = products.find(
        (product) => product.id === productId
      );

      addToCart(productId, selectedProduct);
    });
  });

  infoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);

      renderModal(productId, products);
    });
  });
};

// init
displayFetchedProducts();

let cart = getStorageItem('cart');
displayTotalProductCount(cart, totalProductCount);
