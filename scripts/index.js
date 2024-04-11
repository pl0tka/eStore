import './navbar/navbarInteractions.js';

import { getElement } from './utils/utils.js';
import { displayTotalProductCount } from './common.js';
const totalProductCount = getElement('.nav__cart-count');

// set amount of products in cart (icon)
let cart = JSON.parse(localStorage.getItem('cart'));
if (!cart) {
  cart = [];
}
displayTotalProductCount(cart, totalProductCount);
