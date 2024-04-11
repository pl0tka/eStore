import './navbarInteractions.js';

import { getElement, getStorageItem, setStorageItem } from './utils.js';
import { displayTotalProductCount } from './common.js';
import { renderAllProducts } from './renderAllProducts.js';
import { fetchProducts } from './fetchProducts.js';
import { addSingleProductToCart } from './addProductToCart.js';

// API all products
const url = 'https://fakestoreapi.com/products/';

// DOM selections
const productsContainer = getElement('.products__inner');
const totalProductCount = getElement('.nav__cart-count');

const displayFetchedProducts = async () => {
  const products = await fetchProducts(url);
  renderAllProducts(products, productsContainer);

  // DOM selections
  const addToCartBtns = document.querySelectorAll('.product__add-to-cart-btn');
  const infoBtns = document.querySelectorAll('.product__info-btn');

  // ADD PRODUCT TO CART
  addToCartBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const productId = parseInt(btn.dataset.id);
      addSingleProductToCart(productId, products, totalProductCount);
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
                <button class="btn single-product__add-to-cart-btn" data-action="add" data-id=${id}>
                  add to cart
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>`;

      // change count
      const countDOM = modal.querySelector('.cart-product__count');
      let count = 1;
      countDOM.textContent = 1;

      const handleBtnClick = (event) => {
        const btn = event.target;

        if (btn.classList.contains('btn')) {
          const btnAction = btn.dataset.action;

          if (btnAction === 'increase') {
            count++;
            countDOM.textContent = count;
          }

          if (btnAction === 'decrease') {
            if (count > 1) {
              count--;
            }
            countDOM.textContent = count;
          }

          if (btnAction === 'shopping') {
            modal.classList.add('modal--hide');
            modal.innerHTML = '';
            modal.removeEventListener('click', handleBtnClick);
          }

          if (btnAction === 'add') {
            let cart = getStorageItem('cart');
            const productIndex = cart.findIndex(
              (product) => product.id === productId
            );

            // check if selected product is in storage
            const productInCart = cart.find(
              (product) => product.id === productId
            );
            // set product to add
            if (!productInCart) {
              cart.push({ ...selectedProduct, count: count });
              // add cart to storage
              setStorageItem('cart', cart);
              // update icon
              displayTotalProductCount(cart, totalProductCount);
            } else {
              cart[productIndex].count =
                cart[productIndex].count + parseInt(countDOM.textContent);
              // add cart to storage
              setStorageItem('cart', cart);
              // update icon
              displayTotalProductCount(cart, totalProductCount);
            }

            // product added message
            const modalInner = getElement('.single-product__inner');
            modalInner.classList.add('single-product__inner--added-mes');
            modalInner.innerHTML = `<p class="single-product__product-added-mes">Product added to your cart! &#x1F389;</p>
            <div class="single-product__btns-box--added-mes">
            <button class="btn btn--secondary" data-action="shopping">Continue shopping</button>
            <button class="btn btn--grey"><a class="single-product__btn-link" href="./cart.html">Go to cart<a></button>
            </div>
            `;
          }
        }
      };

      modal.addEventListener('click', handleBtnClick);

      // close modal
      const closeModalBtn = getElement('.single-product__close-btn');
      closeModalBtn.addEventListener('click', () => {
        modal.classList.add('modal--hide');
        modal.innerHTML = '';
        modal.removeEventListener('click', handleBtnClick);
      });
    });
  });
};

// init
displayFetchedProducts();

let cart = getStorageItem('cart');
displayTotalProductCount(cart, totalProductCount);
