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
  <button class="btn cart-product__remove-btn">
    remove
  </button>
  <button class="btn cart-product__decrease-btn">-</button>
  <p class="cart-product__count">${count}</p>
  <button class="btn cart-product__increase-btn">+</button>
</article>`;
  }).join``;

  containerDOM.innerHTML = renderedProducts;
};

const changeSingleProductCountDOM = (countElement, newCount) => {
  countElement.textContent = newCount;
};

// increase product count
const increaseSingleProductCount = (event, currentCart) => {
  const productId = parseInt(event.target.parentElement.dataset.id);
  const productIndex = currentCart.findIndex(
    (product) => product.id === productId
  );
  const singleProductCountDOM = event.target.parentElement.querySelector(
    '.cart-product__count'
  );

  currentCart[productIndex].count++;
  setStorageItem('cart', cart);
  changeSingleProductCountDOM(
    singleProductCountDOM,
    currentCart[productIndex].count
  );
};
// decrease product count
const decreaseSingleProductCount = (event, currentCart) => {
  const productId = parseInt(event.target.parentElement.dataset.id);
  const productIndex = currentCart.findIndex(
    (product) => product.id === productId
  );
  const singleProductCountDOM = event.target.parentElement.querySelector(
    '.cart-product__count'
  );

  if (currentCart[productIndex].count > 1) {
    currentCart[productIndex].count--;
  }

  setStorageItem('cart', cart);
  changeSingleProductCountDOM(
    singleProductCountDOM,
    currentCart[productIndex].count
  );
};

// set total cart value
const setTotalValue = () => {
  totalPrice.innerHTML =
    cart.reduce(
      (sum, product) => sum + product.price * 100 * product.count,
      0
    ) / 100;
};

const init = () => {
  renderCartProducts(cart, cartProductsContainer);
  setTotalValue();
  displayTotalProductCount(cart, totalProductCount);

  // PRODUCT COUNT OPERATIONS
  const increaseProductCountBtns = document.querySelectorAll(
    '.cart-product__increase-btn'
  );
  const decreaseProductCountBtns = document.querySelectorAll(
    '.cart-product__decrease-btn'
  );
  increaseProductCountBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      increaseSingleProductCount(event, cart);
      setTotalValue();
      displayTotalProductCount(cart, totalProductCount);
    });
  });
  decreaseProductCountBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      decreaseSingleProductCount(event, cart);
      setTotalValue();
      displayTotalProductCount(cart, totalProductCount);
    });
  });
};

init();
