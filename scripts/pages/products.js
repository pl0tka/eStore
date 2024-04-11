import '../navbar/navbarInteractions.js';
import { getElement, getStorageItem, url } from '../utils/utils.js';
import { displayTotalProductCount } from '../common.js';
import { displayFetchedProducts } from '../products/displayProducts.js';

const totalProductCount = getElement('.nav__cart-count');
let cart = getStorageItem('cart');

displayFetchedProducts(url);

displayTotalProductCount(cart, totalProductCount);
