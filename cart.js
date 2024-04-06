import { getElement } from './utils.js';
import { displayTotalProductCount } from './common.js';

const cartProductsContainer = getElement('.cart__inner');
const totalPrice = getElement('.cart__total-price');
const totalProductCount = getElement('.nav__cart-count');

let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [];
}

const renderCartProducts = (products, containerDOM) => {
  const renderedProducts = products.map((product) => {
    const { id, title, image, price, count } = product;
    return `<article class="cart-product">
  <img src="${image}" alt="${image}" class="cart-product__img" />
  <h3 class="cart-product__title">${title}</h3>
  <p class="cart-product__price">${price} PLN</p>
  <button class="btn cart-product__remove-btn" data-id="${id}">
    remove
  </button>
  <button class="btn cart-product__decrease-btn">-</button>
  <p class="cart-product__count">${count}</p>
  <button class="btn cart-product__increase-btn">+</button>
</article>`;
  }).join``;

  containerDOM.innerHTML = renderedProducts;
};
renderCartProducts(cart, cartProductsContainer);

// set total cart value
const setTotalValue = () => {
  totalPrice.innerHTML =
    cart.reduce(
      (sum, product) => sum + product.price * 100 * product.count,
      0
    ) / 100;
};
setTotalValue();

displayTotalProductCount(cart, totalProductCount);
