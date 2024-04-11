export const renderCartProducts = (products, containerDOM) => {
  const renderedProducts = products.map((product) => {
    const { id, title, image, price, count } = product;
    return `<article class="cart-product" data-id="${id}">
    <div class="cart-product__img-box"><img src="${image}" alt="${image}" class="cart-product__img" /></div>
    <div class="cart-product__info-box">
    <h3 class="cart-product__title">${title}</h3>
    <p class="cart-product__price">${price} PLN</p>
    </div>
    <button class="btn btn--remove cart-product__remove-btn" data-action="remove">
      remove
    </button>
    <div class="cart-product__counter-box">
    <button class="btn btn--count cart-product__decrease-btn"  data-action="decrease">-</button>
    <p class="cart-product__count">${count}</p>
    <button class="btn btn--count cart-product__increase-btn" data-action="increase">+</button>
    </div>
  </article>`;
  }).join``;

  containerDOM.innerHTML = renderedProducts;
};
