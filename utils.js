const loader = document.querySelector(".loader");
const loaderContainer = document.querySelector(".loader-container");

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

const isRemoved = (article) => {
  return article.title === "[Removed]" || article.description === "[Removed]" || article.author === null;
}

const truncate = (content, wordLimit = 30) => {
  const words = content.split(' ');
  if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
}


export { debounce, removeLoader, isRemoved, truncate };