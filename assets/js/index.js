window.location.hash = "#";

const champions = ["yasuo", "yone", "warwick", "wukong", "neeko", "senna"];

let skills = ["skill-passive", "skill-q", "skill-w", "skill-e", "skill-r"];

const root = document.documentElement;

function applyChampionStyles(championName) {
  root.style.setProperty('--bg-image', `var(--${championName})`);

  const linkIcons = document.querySelectorAll(".link-icon img");
  linkIcons.forEach((linkIcon, index) => {
    linkIcon.src = `./assets/img/${championName}/${skills[index]}.jpg`;
  });
  const audio = new Audio(`./assets/audio/${championName}-theme.mp3`);
  audio.loop = true;
  audio.play();

  const container = document.querySelector('.container');
  container.classList.add('fadeIn');
  console.log(container);
}

window.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.querySelector(".loading");
  const percentage = document.querySelector("#load-percentage");
  const loadTitle = document.querySelector("#load-title");

  let i = 0;

  const _interval = setInterval(() => {
    i += Math.round(Math.random() * 10);
    if (i >= 100) {
      i = 100;
      percentage.innerHTML = `(${i}%)`;
      clearInterval(_interval);

      setTimeout(() => {
        loadTitle.style.opacity = 0;
        setTimeout(() => {
          loadingScreen.removeChild(loadTitle);
          const divStart = document.getElementById("champion-list");
          divStart.classList.add('fadeIn');
          divStart.style.display = "flex";

          const championButtons = divStart.querySelectorAll(".champion-select");
          championButtons.forEach((championBtn) => {
            championBtn.addEventListener('click', () => {
              loadingScreen.style.display = 'none';
              const championId = championBtn.getAttribute('id');
              applyChampionStyles(championId);
            });
          });
        }, 490);
      }, 500);

      return;
    }
    percentage.innerHTML = `(${i}%)`;
  }, 50);

  const links = [
    { element: document.getElementById("link-home") },
    { element: document.getElementById("link-about") },
    { element: document.getElementById("link-skills") },
    { element: document.getElementById("link-projects") },
    { element: document.getElementById("link-contact") },
  ];

  function updateAriaCurrent() {
    const currentHash = window.location.hash || "#home";

    links.forEach((link) => {
      if (link.element.getAttribute("href") === currentHash) {
        link.element.setAttribute("aria-current", "page");
      } else {
        link.element.removeAttribute("aria-current");
      }
    });
  }

  function updatePage() {
    const currentHash = window.location.hash || "#home";
    const sections = document.querySelectorAll("main > div");

    sections.forEach((section) => {
      if ("#" + section.id.slice(5) === currentHash) {
        section.setAttribute("aria-current", "page");
        section.classList.add("active");
      } else {
        section.removeAttribute("aria-current");
        section.classList.remove("active");
      }
    });
  }

  links.forEach((link) => {
    link.element.addEventListener("click", () => {
      window.location.hash = link.element.getAttribute("href");
      updateAriaCurrent();
    });
  });

  window.addEventListener("popstate", updateAriaCurrent);
  window.addEventListener("hashchange", updateAriaCurrent);

  window.addEventListener("popstate", updatePage);
  window.addEventListener("hashchange", updatePage);

  updateAriaCurrent();
  updatePage();
});
