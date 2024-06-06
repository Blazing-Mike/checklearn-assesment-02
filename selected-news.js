const urlParams = new URLSearchParams(window.location.search);
const blogHeader = document.querySelector(".header");
const main = document.querySelector("main");
import { randomImage } from "./utils.js";

const newsItem = {
  title: urlParams.get("title"),
  description: urlParams.get("description"),
  author: urlParams.get("author"),
  date: urlParams.get("date"),
  image: urlParams.get("image"),
  content: urlParams.get("content"),
};

console.log(newsItem);

function displayContent() {
  const { title, description, author, date, image, content } = newsItem;
  blogHeader.innerHTML = `
  <div class="text-content">
  <h2 class="title">${title}</h2> </a>
  <div class="author-date">
  <span class="author"> by ${author || "Unknown author"}  <div class="dot"></div></span>
  <span class="date">${new Date(date.trim()).toDateString()}</span>
</div>
</div>
  <img crossOrigin="anonymous"  src="${randomImage}" alt="${title}" class="blog-image" />
   <p class="content">${description}</p>
  <p class="content">${content}</p>
                      `;

  main.appendChild(blogHeader);
}

displayContent();
