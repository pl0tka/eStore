import { addToCart } from './addProductToCart.js';

export const updateModalProductCountAndCart = (
  productId,
  selectedProduct,
  btnAction,
  modalDOM,
  countDOM,
  handleBtnClick
) => {
  let count = 1;

  if (countDOM) {
    count = parseInt(countDOM.textContent);
  }

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

  if (btnAction === 'add') {
    addToCart(productId, selectedProduct, count);
    // show "product added" message
    const modalInner = modalDOM.querySelector('.single-product__inner');
    modalInner.classList.add('single-product__inner--added-mes');
    modalInner.innerHTML = `<p class="single-product__product-added-mes">Product added to your cart! &#x1F389;</p>
    <div class="single-product__btns-box--added-mes">
    <button class="btn btn--secondary" data-action="shopping">Continue shopping</button>
    <button class="btn btn--grey"><a class="single-product__btn-link" href="./cart.html">Go to cart<a></button>
    </div>
    `;
  }

  if (btnAction === 'shopping') {
    modalDOM.classList.add('modal--hide');
    modalDOM.innerHTML = '';
    modalDOM.removeEventListener('click', handleBtnClick);
  }
};
