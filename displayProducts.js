import { getElement } from './utils.js';
import { renderAllProducts } from './renderAllProducts.js';
import { fetchProducts } from './fetchProducts.js';
import { addToCart } from './addProductToCart.js';
import { renderModal } from './renderModal.js';

const productsContainer = getElement('.products__inner');

export const displayFetchedProducts = async (url) => {
  const products = await fetchProducts(url);

  renderAllProducts(products, productsContainer);

  const addToCartBtns = document.querySelectorAll('.product__add-to-cart-btn');
  const infoBtns = document.querySelectorAll('.product__info-btn');

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
