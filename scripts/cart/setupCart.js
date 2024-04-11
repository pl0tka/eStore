import { getElement, getStorageItem, setStorageItem } from '../utils/utils.js';
import { displayTotalProductCount } from '../common.js';
import { renderCartProducts } from './renderCartProducts.js';

const totalPrice = getElement('.cart__total-price');
const totalProductCount = getElement('.nav__cart-count');
const cartProductsContainer = getElement('.cart__inner');

let cart = getStorageItem('cart');

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

export const setTotalValue = () => {
  totalPrice.innerHTML =
    cart.reduce(
      (sum, product) => sum + product.price * 100 * product.count,
      0
    ) / 100;
};

export const handleBtnClick = (event) => {
  const btn = event.target;
  if (btn.classList.contains('btn')) {
    const productId = parseInt(btn.closest('.cart-product').dataset.id);
    const btnAction = btn.dataset.action;
    updateCart(btn, productId, btnAction);
  }
};
