/* =========================================================
   MastType Pro — Optimized Results JavaScript
   SEO • Accessibility (a11y) • Performance • Theme Engine
   ========================================================= */

"use strict";

/* -------------------------
   Constants & Keys
   ------------------------- */
const STORAGE_KEY = "MastType_User_Data_dvk";
const THEME_KEY = "MastType_Theme_dvk";

/* -------------------------
   DOM Elements Selection
   ------------------------- */
const resultContainer = document.querySelector(".results");
const themeBtn = document.querySelector(".theme-btn");
const body = document.body;

/* -------------------------
   Helper Functions
   ------------------------- */

/**
 * Safely fetches and parses results from localStorage.
 * @returns {Array} List of result objects.
 */
function getResults() {
  try {
    const storedResults = localStorage.getItem(STORAGE_KEY);
    if (!storedResults) return [];

    const parsedResults = JSON.parse(storedResults);
    return Array.isArray(parsedResults) ? parsedResults : [];
  } catch (error) {
    console.warn("MastType Pro: Unable to read saved results from LocalStorage.", error);
    return [];
  }
}

/**
 * Sanitizes and provides fallback values for safe rendering.
 * @param {*} value - Value to check.
 * @param {string} fallback - Fallback string if value is null/empty.
 * @returns {string}
 */
function safeValue(value, fallback = "—") {
  if (value === undefined || value === null || String(value).trim() === "") {
    return fallback;
  }
  return String(value);
}

/**
 * Formats date to ISO Standard for accessibility (<time datetime="...">).
 * @param {string} dateString 
 * @returns {string}
 */
function toISODate(dateString) {
  const parsedDate = new Date(dateString);
  return !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : new Date().toISOString();
}

/* -------------------------
   Accessible Card Generation
   ------------------------- */

/**
 * Creates an accessible Result Card Element.
 * @param {Object} data - Test data record.
 * @param {number} index - Index in result array.
 * @returns {HTMLElement} Article element card.
 */
function createResultCard(data, index) {
  const card = document.createElement("article");
  card.className = "result";
  card.setAttribute("role", "region");
  card.setAttribute("aria-labelledby", `result-heading-${index}`);

  const wpmVal = safeValue(data.wpm, "0");
  const accuracyVal = safeValue(data.accuracy, "0");
  const lenVal = safeValue(data.paragraphLength, "0");
  const mistakeVal = safeValue(data.mistype, "0");
  const rawDate = safeValue(data.timedDate, "Recent");
  const paragraphVal = safeValue(data.paragraph, "No typing text stored for this session.");

  // Accessible HTML Structure with Semantic HTML5 Definition List
  card.innerHTML = `
    <h3 id="result-heading-${index}" class="sr-only">Typing Test Result #${index + 1}</h3>
    
    <p class="result-highlight" aria-label="Speed: ${wpmVal} Words Per Minute">
      <span>Speed:</span> <strong>${wpmVal} WPM</strong>
    </p>

    <div class="result-grid" role="group" aria-label="Performance Metrics">
      <p aria-label="Accuracy rate: ${accuracyVal} percent">
        <span>Accuracy:</span> <strong>${accuracyVal}%</strong>
      </p>
      <p aria-label="Total mistakes: ${mistakeVal} characters">
        <span>Mistakes:</span> <strong>${mistakeVal}</strong>
      </p>
      <p aria-label="Paragraph length: ${lenVal} characters">
        <span>Length:</span> <strong>${lenVal} chars</strong>
      </p>
      <p>
        <span>Time:</span> 
        <time datetime="${toISODate(rawDate)}">${rawDate}</time>
      </p>
    </div>

    <div class="result-details">
      <h4>Typed Snippet</h4>
      <p class="result-paragraph">${paragraphVal}</p>
    </div>
  `;

  return card;
}

/* -------------------------
   DOM Render Logic
   ------------------------- */

/**
 * Renders saved typing results with zero UI flickering.
 */
function renderResults() {
  if (!resultContainer) return;

  const results = getResults();

  // Clear previous DOM Nodes safely
  resultContainer.replaceChildren();

  /* Empty State Handling */
  if (results.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-results-container";
    emptyState.setAttribute("role", "status");
    emptyState.setAttribute("aria-live", "polite");

    emptyState.innerHTML = `
      <p class="empty-results">
        No typing tests recorded yet. Complete your first typing test to track progress!
      </p>
    `;

    resultContainer.appendChild(emptyState);
    return;
  }

  /* Fragment batching to prevent reflow issues */
  const fragment = document.createDocumentFragment();

  results.forEach((data, index) => {
    const card = createResultCard(data, index);
    fragment.appendChild(card);
  });

  resultContainer.appendChild(fragment);
}

/* -------------------------
   Theme Engine (Storage + System A11y)
   ------------------------- */

function getSavedTheme() {
  try {
    return localStorage.getItem(THEME_KEY);
  } catch {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.warn("MastType Pro: Could not save theme preference.", error);
  }
}

function updateThemeUI(isDark) {
  if (!themeBtn) return;

  themeBtn.classList.toggle("active-theme-dark", isDark);
  themeBtn.setAttribute("aria-pressed", String(isDark));

  const modeText = isDark ? "Switch to light theme" : "Switch to dark theme";
  themeBtn.setAttribute("aria-label", modeText);
  themeBtn.setAttribute("title", modeText);
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  body.dataset.isDark = String(isDark);
  updateThemeUI(isDark);
}

function initializeTheme() {
  const savedTheme = getSavedTheme();

  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
    return;
  }

  // Fallback to system user color preference
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

/* -------------------------
   Event Listeners Setup
   ------------------------- */
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isCurrentlyDark = body.dataset.isDark === "true";
    const newTheme = isCurrentlyDark ? "light" : "dark";

    applyTheme(newTheme);
    saveTheme(newTheme);
  });
}

// System theme dynamically update handling
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!getSavedTheme()) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });
}

/* -------------------------
   Initialize Application
   ------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  renderResults();
});