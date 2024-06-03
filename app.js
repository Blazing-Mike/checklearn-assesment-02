import { debounce, removeLoader } from "./utils.js";

const BASE_URL = `https://newsapi.org/v2/everything?q=javascript&pageSize=20`;
const API_URL = `https://newsapi.org/v2/everything`;
export const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "363c2ee3b5cd4d67920bd37d68478583",
  },
};

const newsList = document.getElementById("newsList");
const main = document.querySelector("main");
const loader = document.querySelector(".loader");
const loaderContainer = document.querySelector(".loader-container");
const searchInput = document.getElementById("search");

async function fetchNews(query = '') {
  try {
      const url = query ? `${API_URL}?q=${encodeURIComponent(query)}` : BASE_URL;
      const response = await fetch(url, options);
      const data = await response.json();
      displayNews(data?.articles);  // Adjust according to the structure of your API response
  } catch (error) {
      console.error('Error fetching news:', error);
  }
}

function displayNews(news) {
  newsList.innerHTML = '';
  news.forEach(article => {
      const newsItem = document.createElement('div');
      newsItem.classList.add('news-item');
      newsItem.innerHTML = `
          <img src="${article.urlToImage}" alt="${article.title}" />
          <h2>${article.title}</h2>
          <p>${article.description}</p>
      `;
      newsList.appendChild(newsItem);
  });
}

const debouncedSearch = debounce((query) => {
  console.log(query);
  fetchNews(query);
}, 300);

searchInput.addEventListener('input', (event) => {
 const query = searchInput.value.toLowerCase();
  debouncedSearch(query);
});


// Initial fetch
fetchNews();
