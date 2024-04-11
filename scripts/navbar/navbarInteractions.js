import { getElement } from '../utils/utils.js';

const toggleNavBtn = getElement('.header__toggle-btn');
const nav = getElement('.nav');
const navItemCart = getElement('.nav__item-cart');
const navCartCountBox = getElement('.nav__cart-count-box');

const minWidth = '768';
const colorOfCountBoxInitial = '#222';
const colorOfCountBoxOnHover = '#d66c36';

// close nav bar at certain width (md-screen)
const getMaxScreenSizeMatcher = window.matchMedia(`(min-width: ${minWidth}px)`);
const handleScreenChange = (event) => {
  if (event.matches) {
    nav.classList.remove('nav__links--show');
  }
};
getMaxScreenSizeMatcher.addEventListener('change', handleScreenChange);

// toggle navbar
toggleNavBtn.addEventListener('click', () => {
  nav.classList.toggle('nav__links--show');
});

// change color of cart count box on hover
navItemCart.addEventListener('mouseenter', () => {
  navCartCountBox.style.backgroundColor = colorOfCountBoxOnHover;
});
navItemCart.addEventListener('mouseleave', () => {
  navCartCountBox.style.backgroundColor = colorOfCountBoxInitial;
});
