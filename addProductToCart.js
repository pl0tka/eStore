import { getElement, setStorageItem, getStorageItem } from './utils.js';
import { displayTotalProductCount } from './common.js';

const totalProductCount = getElement('.nav__cart-count');

export const addToCart = (productId, selectedProduct, count = 1) => {
  let cart = getStorageItem('cart');
  const productInCart = cart.find((product) => product.id === productId);
  const productIndex = cart.findIndex((product) => product.id === productId);

  // set product to add
  if (!productInCart) {
    cart.push({ ...selectedProduct, count });
  } else {
    cart[productIndex].count = cart[productIndex].count + 1;
  }

  setStorageItem('cart', cart);
  displayTotalProductCount(cart, totalProductCount);
};
