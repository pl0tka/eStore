export const displayPopup = () => {
  const popup = document.createElement('div');
  popup.innerHTML = `<p class="popup">Product added to your cart &#x1F389;</p>`;
  document.body.appendChild(popup);
  setTimeout(() => {
    document.body.removeChild(popup);
  }, 2400);
};
