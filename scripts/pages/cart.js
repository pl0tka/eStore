import '../navbar/navbarInteractions.js';
import { getElement, getStorageItem } from '../utils/utils.js';
import { displayTotalProductCount } from '../common.js';
import { renderCartProducts } from '../cart/renderCartProducts.js';
import { setTotalValue, handleBtnClick } from '../cart/setupCart.js';

const cartProductsContainer = getElement('.cart__inner');
const totalProductCount = getElement('.nav__cart-count');

let cart = getStorageItem('cart');

const init = () => {
  const pageLoading = getElement('.loading-spinner');

  renderCartProducts(cart, cartProductsContainer);
  setTotalValue();
  displayTotalProductCount(cart, totalProductCount);

  cartProductsContainer.addEventListener('click', handleBtnClick);

  pageLoading.style.display = 'none';
};

init();
