import './navbarInteractions.js';

import { getElement, getStorageItem } from './utils.js';
import { displayTotalProductCount } from './common.js';

// API all products
const url = 'https://fakestoreapi.com/products/';

// DOM selections
const productsContainer = getElement('.products__inner');
const totalProductCount = getElement('.nav__cart-count');

// FETCH PRODUCTS
const fetchProducts = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

// RENDER PRODUCTS
const renderProducts = (products, containerDOM) => {
  const renderedProducts = products.map((product) => {
    const { id, title, image, price, description } = product;
    return `<article class="product">
    <div class="product__img-box">
    <img src="${image}" alt="${image}" class="product__img" /></div>
    <h3 class="product__title">${title}</h3>
    <p class="product__price">${price} PLN</p>
    <div class="products__btns-box">
    <button
      class="btn product__add-to-cart-btn"
      data-id="${id}">
      add to cart
    </button>
    <button
      class="btn btn--white product__info-btn"
      data-id="${id}">
      <i class="fa-solid fa-magnifying-glass"></i>
    </button>
    </div>
  </article>`;
  }).join``;

  containerDOM.innerHTML = renderedProducts;
};

const displayFetchedProducts = async () => {
  const products = await fetchProducts(url);
  renderProducts(products, productsContainer);

  // ADD PRODUCT TO CART
  const addToCartBtns = document.querySelectorAll('.product__add-to-cart-btn');
  const infoBtns = document.querySelectorAll('.product__info-btn');

  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const selectedProduct = products.find(
        (product) => product.id === productId
      );
      // LOCAL STORAGE OPERATIONS
      // check if storage is empty
      let cart = getStorageItem('cart');
      // check if selected product is in storage
      const productInCart = cart.find((product) => product.id === productId);
      // set product to add
      if (!productInCart) {
        cart.push({ ...selectedProduct, count: 1 });
      } else {
        cart = cart.map((product) => {
          if (product.id === productId) {
            return { ...selectedProduct, count: product.count + 1 };
          } else {
            return product;
          }
        });
      }
      // add cart to storage
      localStorage.setItem('cart', JSON.stringify(cart));

      // set amount of products in cart (icon)
      displayTotalProductCount(cart, totalProductCount);
    });
  });

  infoBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      const selectedProduct = products.find(
        (product) => product.id === productId
      );

      // SHOW INFO ABOUT PRODUCT
      const { id, title, image, price, description } = selectedProduct;
      const modal = document.querySelector('.modal');
      modal.classList.remove('modal--hide');
      modal.innerHTML = `<div class="overlay">
      <article class="single-product">
        <button class="btn btn--remove single-product__close-btn">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="single-product__inner">
          <div class="single-product__img-box">
            <img src="${image}" alt="${image}" class="single-product__img" />
          </div>
          <div class="single-product__info">
            <p class="single-product__price">${price} PLN</p>
            <h3 class="single-product__title">${title}</h3>
            <p class="single-product__desc">${description}</p>
            <div class="single-product__counter-box">
              <button
                class="btn btn--count cart-product__decrease-btn"
                data-action="decrease"
              >
                -
              </button>
              <p class="cart-product__count">1</p>
              <button
                class="btn btn--count cart-product__increase-btn"
                data-action="increase"
              >
                +
              </button>
              <button class="btn single-product__add-to-cart-btn" data-id=${id}>
                add to cart
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>`;

      const closeModalBtn = getElement('.single-product__close-btn');
      closeModalBtn.addEventListener('click', () => {
        modal.classList.add('modal--hide');
        modal.innerHTML = '';
      });
    });
  });
};

// init
displayFetchedProducts();

let cart = getStorageItem('cart');
displayTotalProductCount(cart, totalProductCount);
