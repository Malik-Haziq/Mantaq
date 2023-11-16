// const nav = document.querySelector(".nav");
const navMenu = document.querySelector("nav ul");
const openNav = document.querySelector(".menu-icon");
const closeNav = document.querySelector(".close-icon");
const workEls = document.querySelectorAll(".work-box");
const workImgs = document.querySelectorAll(".work-img");
const mainEl = document.querySelector("main");


openNav.addEventListener("click",()=>{
  openNav.classList.add('hidden')
  closeNav.classList.remove('hidden')

  navMenu.style.transform = 'translateY(0)'
})

closeNav.addEventListener("click",()=>{
  openNav.classList.remove('hidden')
  closeNav.classList.add('hidden')

  navMenu.style.transform = 'translateY(-150%)'

})

// navMenu.addEventListener("click", (e) => {
//   if (e.target.localName === "a") {
//     toggleNav();
//   }
// });

// document.body.addEventListener("keydown", (e) => {
//   if (e.key === "Escape" && !nav.classList.contains("hidden")) {
//     toggleNav();
//   }
// });

// Animating work instances on scroll

workImgs.forEach((workImg) => workImg.classList.add("transform"));

let observer = new IntersectionObserver(
  (entries) => {
    const [entry] = entries;
    const [textbox, picture] = Array.from(entry.target.children);
    if (entry.isIntersecting) {
      picture.classList.remove("transform");
      Array.from(textbox.children).forEach(
        (el) => (el.style.animationPlayState = "running")
      );
    }
  },
  { threshold: 0.3 }
);

workEls.forEach((workEl) => {
  observer.observe(workEl);
});


// Toggle theme and store user preferred theme for future

const switchThemeEl = document.querySelector('input[type="checkbox"]');
const storedTheme = localStorage.getItem('theme')

switchThemeEl.checked = storedTheme === 'light' || storedTheme === null

switchThemeEl.addEventListener("click", () => {
  const isChecked = switchThemeEl.checked;

  if (!isChecked) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    switchThemeEl.checked = false
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

});

// Trap the tab when menu is opened

const lastFocusedEl = document.querySelector('a[aria-data="last-focused"]');

document.body.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && document.activeElement === lastFocusedEl) {
    e.preventDefault();
    btnToggleNav.focus();
  }
});

const logosWrappers = document.querySelectorAll(".logo-group");

const sleep = (number) => new Promise((res) => setTimeout(res, number));

logosWrappers.forEach(async (logoWrapper, i) => {
  const logos = Array.from(logoWrapper.children);
  await sleep(1400 * i);
  setInterval(() => {
    let temp = logos[0];
    logos[0] = logos[1];
    logos[1] = logos[2];
    logos[2] = temp;
    logos[0].classList.add("hide", "to-top");
    logos[1].classList.remove("hide", "to-top", "to-bottom");
    logos[2].classList.add("hide", "to-bottom");
  }, 5600);
});

// Shiny hover effect on cards that follows mouse

const cards = document.querySelector(".cards");

cards.addEventListener("mousemove", (e) => {
  if (e.target.classList.contains("card")) {
    const { x, y } = e.target.getBoundingClientRect();
    e.target.style.setProperty("--x", `${e.clientX - x}px`);
    e.target.style.setProperty("--y", `${e.clientY - y}px`);
  }
});
