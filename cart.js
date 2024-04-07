import { getElement, getStorageItem, setStorageItem } from './utils.js';
import { displayTotalProductCount } from './common.js';

const cartProductsContainer = getElement('.cart__inner');
const totalPrice = getElement('.cart__total-price');
const totalProductCount = getElement('.nav__cart-count');

let cart = getStorageItem('cart');

const renderCartProducts = (products, containerDOM) => {
  const renderedProducts = products.map((product) => {
    const { id, title, image, price, count } = product;
    return `<article class="cart-product" data-id="${id}">
  <img src="${image}" alt="${image}" class="cart-product__img" />
  <h3 class="cart-product__title">${title}</h3>
  <p class="cart-product__price">${price} PLN</p>
  <button class="btn cart-product__remove-btn" data-action="remove">
    remove
  </button>
  <button class="btn cart-product__decrease-btn" data-action="decrease">-</button>
  <p class="cart-product__count">${count}</p>
  <button class="btn cart-product__increase-btn" data-action="increase">+</button>
</article>`;
  }).join``;

  containerDOM.innerHTML = renderedProducts;
};

const updateCart = (btn, productId, action) => {
  const productIndex = cart.findIndex((product) => product.id === productId);
  const singleProductCountDOM = btn.parentElement.querySelector(
    '.cart-product__count'
  );

  if (action === 'increase') {
    cart[productIndex].count++;
  }
  if (action === 'decrease') {
    if (cart[productIndex].count > 1) {
      cart[productIndex].count--;
    }
  }
  if (action === 'remove') {
    cart = cart.filter((product) => product.id !== productId);
  }

  setStorageItem('cart', cart);
  updateCartProductListDOM(action, singleProductCountDOM, productIndex);
  setTotalValue();
  displayTotalProductCount(cart, totalProductCount);
};

const updateCartProductListDOM = (action, productCountDOM, productIndex) => {
  if (action === 'increase' || action === 'decrease') {
    productCountDOM.textContent = cart[productIndex].count;
  }
  if (action === 'remove') {
    renderCartProducts(cart, cartProductsContainer);
  }
};

const setTotalValue = () => {
  totalPrice.innerHTML =
    cart.reduce(
      (sum, product) => sum + product.price * 100 * product.count,
      0
    ) / 100;
};

const handleBtnClick = (event) => {
  const btn = event.target;
  if (btn.classList.contains('btn')) {
    const productId = parseInt(btn.parentElement.dataset.id);
    const btnAction = btn.dataset.action;
    updateCart(btn, productId, btnAction);
  }
};

const init = () => {
  renderCartProducts(cart, cartProductsContainer);
  setTotalValue();
  displayTotalProductCount(cart, totalProductCount);

  cartProductsContainer.addEventListener('click', handleBtnClick);
};

init();
