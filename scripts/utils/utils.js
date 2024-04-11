export const url = 'https://fakestoreapi.com/products/'; // Products API

export const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`The selector "${selection}" does not exist`);
};

export const getStorageItem = (itemKey) => {
  let storageItem = JSON.parse(localStorage.getItem(itemKey));
  if (!storageItem) {
    storageItem = [];
  }
  return storageItem;
};

export const setStorageItem = (itemKey, itemValue) => {
  localStorage.setItem(itemKey, JSON.stringify(itemValue));
};
