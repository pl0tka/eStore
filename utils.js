export const getElement = (selection) => {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(`The selector "${selection}" does not exist`);
};
