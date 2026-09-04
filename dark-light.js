let theme = localStorage.getItem("MastType_Theme_dvk") || "light";
const themeInput = document.querySelector(".theme-input");
const body = document.body;

function applyTheme() {
  // Body dataset update karein
  body.dataset.theme = theme;
  
  // Input/Select element ki value set karein taaki dropdown mein sahi theme selected dikhe
  if (themeInput) {
    themeInput.value = theme;
    
    // Class toggle tabhi karein jab dark theme ho (boolean check)
    themeInput.classList.toggle("active-theme-dark", theme === "dark");
    themeInput.setAttribute("aria-pressed", String(theme === "dark"));
  }
}

// Initial theme apply karein page load par
applyTheme();

// Event listener
if (themeInput) {
  themeInput.addEventListener("change", (e) => {
    theme = e.target.value;
    localStorage.setItem("MastType_Theme_dvk", theme);
    applyTheme();
  });
}