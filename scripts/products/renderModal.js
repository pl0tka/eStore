import { getElement } from '../utils/utils.js';
import { updateModalProductCountAndCart } from './updateModalProductCountAndCart.js';

export const renderModal = (productId, products) => {
  const selectedProduct = products.find((product) => product.id === productId);
  const { id, title, image, price, description } = selectedProduct;
  const modal = getElement('.modal');

  // render modal
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

  const handleBtnClick = (event) => {
    const btn = event.target;

    if (btn.classList.contains('btn')) {
      const btnAction = btn.dataset.action;
      const countDOM = modal.querySelector('.cart-product__count');

      updateModalProductCountAndCart(
        productId,
        selectedProduct,
        btnAction,
        modal,
        countDOM,
        handleBtnClick
      );
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
};
