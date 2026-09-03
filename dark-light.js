let theme = localStorage.getItem("MastType_Theme_dvk") || "light";
const themeInput = document.querySelector(".theme-input");
const body = document.body;

function applyTheme() {
  theme =  theme|| themeInput.value ;
  body.dataset.theme = String(theme);
  themeInput.classList.toggle("active-theme-dark", theme);
  themeInput.setAttribute("aria-pressed", String(theme));
  
}

applyTheme();

themeInput.addEventListener("change", (e) => {
  theme = e.target.value;
  applyTheme();
  localStorage.setItem("MastType_Theme_dvk", theme);
});
