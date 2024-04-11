import { setStorageItem, getStorageItem } from './utils.js';
import { displayTotalProductCount } from './common.js';

export const addSingleProductToCart = (
  productId,
  products,
  totalProductCountDOM
) => {
  let cart = getStorageItem('cart');
  const selectedProduct = products.find((product) => product.id === productId);
  const productInCart = cart.find((product) => product.id === productId);

  // set product to add
  if (!productInCart) {
    cart.push({ ...selectedProduct, count: 1 });
  } else {
    const productIndex = cart.findIndex((product) => product.id === productId);
    cart[productIndex].count = cart[productIndex].count + 1;
  }

  setStorageItem('cart', cart);
  displayTotalProductCount(cart, totalProductCountDOM);
};
