import { debounce, removeLoader, isRemoved, truncate } from "./utils.js";

const BASE_URL = `https://newsapi.org/v2/everything?q=design&pageSize=15`;
const API_URL = `https://newsapi.org/v2/everything`;
export const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "363c2ee3b5cd4d67920bd37d68478583",
  },
};
const newsList = document.getElementById("newsList");
const main = document.querySelector("main");

const searchInput = document.getElementById("search");

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


async function fetchNews(query = "") {
  try {
    const url = query ? `${API_URL}?q=${encodeURIComponent(query)}` : BASE_URL;
    const response = await fetch(url, options);
    const data = await response.json();
    removeLoader();
    const filteredNews = data?.articles.filter(
      (article) => !isRemoved(article)
    );
    displayNews(filteredNews);
  } catch (error) {
    console.error("Error fetching news:", error);
    removeLoader();
  }
}

function displayNews(news) {
  newsList.innerHTML = "";
  news.forEach((article) => {
    const randomImage =
      cloudinaryImages[Math.floor(Math.random() * cloudinaryImages.length)];
    const newsItem = document.createElement("div");
    newsItem.classList.add("news-item");
    newsItem.innerHTML = `
          <img crossOrigin="anonymous"  src="${randomImage}" alt="${article.title}" class="news-image" />
          <div class="news-content">
          <a href="${article.url}" target="_blank" class="">
          <h2 class="title">${article.title}</h2> </a>
          <div class="author-date">
              <span class="author"> by ${article.author || "Unknown author"} </span>
              <span class="date">${new Date(article.publishedAt).toDateString()}</span>
          </div>
          <a href="${article.url}" target="_blank" class="read-more">Read more</a>
          </div>
      `;
    newsList.appendChild(newsItem);
  });
}

const debouncedSearch = debounce((query) => {
  console.log(query);
  fetchNews(query);
}, 300);

searchInput.addEventListener("input", (event) => {
  const query = searchInput.value.toLowerCase();
  debouncedSearch(query);
});

// Initial fetch
fetchNews();
