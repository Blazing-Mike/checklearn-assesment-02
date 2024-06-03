
const removeLoader = () => {
  loader.style.display = "none";
  loaderContainer.style.display = "none";
}

const debounce = (callback, wait) => {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};


export { debounce, removeLoader };