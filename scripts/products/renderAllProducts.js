export const renderAllProducts = (products, containerDOM) => {
  const renderedProducts = products.map((product) => {
    const { id, title, image, price } = product;
    return `<article class="product">
    <div class="product__img-box">
    <img src="${image}" alt="${image}" class="product__img" /></div>
    <h3 class="product__title">${title}</h3>
    <p class="product__price">${price} PLN</p>
    <div class="product__btns-box">
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
