"use strict";

import { api_key, fetchDataFromServer } from "./api.js";

let sidebarInitialized = false;

export function sidebar() {
  if (sidebarInitialized) return;
  sidebarInitialized = true;

  const genreList = {};

  fetchDataFromServer(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`,
    function ({ genres }) {
      for (const { id, name } of genres) {
        genreList[id] = name;
      }
      genreLink();
    }
  );

  const sidebarInner = document.createElement("div");
  sidebarInner.classList.add("sidebar-inner");

  sidebarInner.innerHTML = `
    <div class="sidebar-list">
      <p class="title">Genre</p>
    </div>
    
    <div class="sidebar-list">
      <p class="title">Language</p>
      <a href="../page/movie-list.html?active=language-en" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=en", "English")'>English</a>
      <a href="../page/movie-list.html?active=language-hi" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=hi", "Hindi")'>Hindi</a>
      <a href="../page/movie-list.html?active=language-bn" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=bn", "Bengali")'>Bengali</a>
      <a href="../page/movie-list.html?active=language-vi" menu-close class="sidebar-link" onclick='getMovieList("with_original_language=vi", "Vietnamese")'>Viet Nam</a>
    </div>
    
    <div class="sidebar-footer">
      <p class="copyright">Copyright 2024</p>
      <img
        src="./../assets/icon/tmdb-logo.svg"
        width="130"
        height="17"
        alt="the movie database logo"
      />
    </div>
  `;

  const genreLink = function () {
    const genreListElement = sidebarInner.querySelector(".sidebar-list");
    genreListElement.innerHTML = '<p class="title">Genre</p>';

    for (const [genreId, genreName] of Object.entries(genreList)) {
      const link = document.createElement("a");
      link.classList.add("sidebar-link");
      link.setAttribute("href", `../page/movie-list.html?active=genre-${genreId}`);
      link.setAttribute("menu-close", "");
      link.setAttribute(
        "onclick",
        `getMovieList("with_genres=${genreId}", "${genreName}")`
      );
      link.textContent = genreName;

      genreListElement.appendChild(link);
    }

    const sidebar = document.querySelector("[sidebar]");
    sidebar.appendChild(sidebarInner);
    toggleSidebar(sidebar);

    setActiveLink();
  };

  const toggleSidebar = function (sidebar) {
    const sidebarBtn = document.querySelector("[menu-btn]");
    const sidebarTogglers = document.querySelectorAll("[menu-toggler]");
    const sidebarClose = document.querySelectorAll("[menu-close]");
    const overlay = document.querySelector("[overlay]");

    addEventOnElements(sidebarTogglers, "click", function () {
      sidebar.classList.toggle("active");
      sidebarBtn.classList.toggle("active");
      overlay.classList.toggle("active");
    });

    addEventOnElements(sidebarClose, "click", function () {
      sidebar.classList.remove("active");
      sidebarBtn.classList.remove("active");
      overlay.classList.remove("active");
    });
  };
}

function setActiveLink() {
  const currentURL = new URL(window.location.href);
  const activeParam = currentURL.searchParams.get('active');

  if (activeParam) {
    const activeLink = document.querySelector(`a[href$="active=${activeParam}"]`);
    if (activeLink) {
      document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
      });
      activeLink.classList.add('active');
    }
  }
}

function addEventOnElements(elements, eventType, callback) {
  for (const elem of elements) elem.addEventListener(eventType, callback);
}

const style = document.createElement('style');
style.textContent = `
  .sidebar-link.active {
    font-weight: bold;
    color: var(--primary);
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
  sidebar();
});