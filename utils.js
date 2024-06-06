const loader = document.querySelectorAll(".loader");
const loaderContainer = document.querySelectorAll(".loader-container");
const main = document.querySelector("main");

const removeLoader = () => {
  for (const element of loader) {
    element.style.display = "none";
  }
  for (const element of loaderContainer) {
    element.style.display = "none";
  }
};

const addLoader = () => {
  for (const element of loader) {
    element.style.display = "block";
  }
  for (const element of loaderContainer) {
    element.style.display = "block";
  }
};

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
  return (
    article.title === "[Removed]" ||
    article.description === "[Removed]" ||
    article.author === null
  );
};

const truncate = (content, wordLimit = 30) => {
  const words = content.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return content;
};

const cloudinaryImages = [
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727405/photo-1667125095636-dce94dcbdd96_vmtlnt.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727345/photo-1713124849883-9bbb982de639_b6oxi2.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727321/photo-1705909773420-8d7af2a343f9_en7zzz.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727226/photo-1650893843097-e32411fda3dd_tzfehw.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727197/photo-1709305317887-383781f1c217_wbmuz2.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727182/photo-1710942499889-71f233dae342_tetrgo.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727167/photo-1710937737232-7f0805d61525_jbwr78.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727151/photo-1710938134119-a6977c5c95f2_co4j32.jpg",
  "https://res.cloudinary.com/dld9w13tr/image/upload/v1715727127/photo-1714926311975-85300ee0a85a_fzcehh.jpg",
];

const randomImage =
  cloudinaryImages[Math.floor(Math.random() * cloudinaryImages.length)];

function displayError(message) {
  const errorElement = document.createElement("div");
  errorElement.className = "error";
  errorElement.textContent = message;
  main.appendChild(errorElement);
}

export {
  addLoader,
  debounce,
  displayError,
  isRemoved,
  randomImage,
  removeLoader,
  truncate,
};
