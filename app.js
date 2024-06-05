import { debounce, isRemoved, randomImage, removeLoader } from "./utils.js";

const BASE_URL = `https://newsapi.org/v2/everything?q=design&pageSize=6`;
const API_URL = `https://newsapi.org/v2/everything`;
const HEADLINES_URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=6`;
export const options = {
  method: "GET",
  headers: {
    "X-Api-Key": "363c2ee3b5cd4d67920bd37d68478583",
  },
};
const newsList = document.getElementById("newsList");

const searchInput = document.getElementById("search");

async function fetchNews(query = "") {
  try {
    const url = query
      ? `${API_URL}?q=${encodeURIComponent(query)}&pageSize=8`
      : BASE_URL;
    const response = await fetch(url, options);
    const data = await response.json();
    removeLoader();
    const filteredNews = data?.articles.filter(
      (article) => !isRemoved(article)
    );
    displayNews(filteredNews);
    displayFeatured(filteredNews);
  } catch (error) {
    console.error("Error fetching news:", error);
    removeLoader();
  }
}

//fetch headlines
async function fetchHeadlines() {
  try {
    const response = await fetch(`${HEADLINES_URL}`, options);
    const data = await response.json();
    const filteredNews = data?.articles.filter(
      (article) => !isRemoved(article)
    );
    displayHeadlines(filteredNews);
  } catch (error) {
    console.error("Error fetching headlines:", error);
  }
}

function displayHeadlines(news) {
  const headlines = document.querySelector(".headlines");
  news.forEach((article) => {
    const headline = document.createElement("div");
    headline.classList.add("headline");
    headline.innerHTML = `
            <a href="selected-news.html?title=${encodeURIComponent(article.title)}
            &description=${encodeURIComponent(article.description)}
            &author=${encodeURIComponent(article.author)}
            &date=${encodeURIComponent(article.publishedAt)}
            &image=${encodeURIComponent(article.urlToImage)}
            &content=${encodeURIComponent(article.content)}" target="_blank" class="headline-link">
                <p class="headline-title">${article.title}</p>
            </a>
        `;
    headlines.appendChild(headline);
  });
}

function displayNews(news) {
  newsList.innerHTML = "";
  news.forEach((article) => {
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
            <a href="selected-news.html?title=${encodeURIComponent(article.title)}
            &description=${encodeURIComponent(article.description)}
            &author=${encodeURIComponent(article.author)}
            &date=${encodeURIComponent(article.publishedAt)}
            &image=${encodeURIComponent(article.urlToImage)}
            &content=${encodeURIComponent(article.content)}"
            target="_blank" class="read-more">Read more</a>
            </div>
        `;

    newsList.appendChild(newsItem);
  });
}

function displayFeatured(news) {
  featuredList.innerHTML = "";
  const formatNews = news.slice(0, 6);
  formatNews.forEach((article) => {
    const featuredItem = document.createElement("div");
    featuredItem.classList.add("featured-item");
    featuredItem.innerHTML = `
          <img crossOrigin="anonymous"  src="${randomImage}" alt="${article.title}" class="news-image
          " />
          <div class="news-content">
          <a href="${article.url}" target="_blank" class="">
          <h2 class="title">${article.title}</h2> </a>
          <div class="author-date">
              <span class="author"> by ${article.author || "Unknown author"} </span>
              <span class="date">${new Date(article.publishedAt).toDateString()}</span>
          </div>
          <a href="selected-news.html?title=${encodeURIComponent(article.title)}
          &description=${encodeURIComponent(article.description)}
          &author=${encodeURIComponent(article.author)}
          &date=${encodeURIComponent(article.publishedAt)}
          &image=${encodeURIComponent(article.urlToImage)}
          &content=${encodeURIComponent(article.content)}" target="_blank" class="read-more">Read more</a>
          </div>
      `;
    featuredList.appendChild(featuredItem);
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
fetchHeadlines();
