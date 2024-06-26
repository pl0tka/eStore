import { getElement, getStorageItem, setStorageItem } from '../utils/utils.js';
import { displayTotalProductCount } from '../common/common.js';
import { renderCartProducts } from './renderCartProducts.js';

const totalProductCount = getElement('.nav__cart-count');
const cartProductsContainer = getElement('.cart__inner');
const totalPrice = getElement('.cart__total-price');
const totalPriceWrapper = getElement('.cart__total-price-wrapper');
const checkoutBtn = getElement('.cart__checkout-btn');

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
  const total =
    cart.reduce(
      (sum, product) => sum + product.price * 100 * product.count,
      0
    ) / 100;

  if (total) {
    totalPrice.innerHTML = total;
    totalPriceWrapper.classList.remove('cart__total-price--hidden');
    checkoutBtn.classList.remove('cart__checkout-btn--hidden');
  } else {
    totalPriceWrapper.classList.add('cart__total-price--hidden');
    checkoutBtn.classList.add('cart__checkout-btn--hidden');
    cartProductsContainer.innerHTML = `<p class="cart__empty-mes">Your cart is empty &#x1F97A;</p>`;
  }
};

export const handleBtnClick = (event) => {
  const btn = event.target;
  if (btn.classList.contains('btn')) {
    const productId = parseInt(btn.closest('.cart-product').dataset.id);
    const btnAction = btn.dataset.action;
    updateCart(btn, productId, btnAction);
  }
};
