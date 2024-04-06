// set amount of products in cart (icon)
export const displayTotalProductCount = (cart, containerDOM) => {
  containerDOM.innerHTML = cart.reduce(
    (sum, product) => sum + product.count,
    0
  );
};
