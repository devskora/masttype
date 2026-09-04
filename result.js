

/* =========================================================
   MastType Pro — High-Performance Results Module
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
const themeSelect = document.querySelector("#theme-select");
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
 * Sanitizes text to prevent XSS attacks while preserving formatting.
 * @param {*} value - Value to escape.
 * @param {string} fallback - Fallback string if value is null/empty.
 * @returns {string}
 */
function escapeHTML(value, fallback = "—") {
  if (value === undefined || value === null || String(value).trim() === "") {
    return fallback;
  }
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

/**
 * Formats readable human date string.
 * @param {string} dateString 
 * @returns {string}
 */
function formatHumanDate(dateString) {
  const parsedDate = new Date(dateString);
  if (isNaN(parsedDate.getTime())) return "Recent";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(parsedDate);
}

/* -------------------------
   Accessible Card Generation
   ------------------------- */

/**
 * Creates an accessible Result Card Element using semantic Definition Lists (<dl>).
 * @param {Object} data - Test data record.
 * @param {number} index - Index in result array.
 * @returns {HTMLElement} Article element card.
 */
function createResultCard(data, index) {
  const card = document.createElement("article");
  card.className = "result";
  card.setAttribute("role", "article");
  card.setAttribute("aria-labelledby", `result-heading-${index}`);

  const wpmVal = escapeHTML(data.wpm, "0");
  const accuracyVal = escapeHTML(data.accuracy, "0");
  const lenVal = escapeHTML(data.paragraphLength, "0");
  const mistakeVal = escapeHTML(data.mistype, "0");
  const rawDate = escapeHTML(data.timedDate, new Date().toISOString());
  const paragraphVal = escapeHTML(data.paragraph, "No typing text recorded for this session.");

  // Accessible HTML Structure with Semantic HTML5 Definition List for WCAG compliance
  card.innerHTML = `
    <header class="result-card-header">
      <h3 id="result-heading-${index}">Test Session #${index + 1}</h3>
      <time class="result-time" datetime="${toISODate(rawDate)}">
        ${formatHumanDate(rawDate)}
      </time>
    </header>

    <div class="result-highlight" aria-label="Typing speed: ${wpmVal} Words Per Minute">
      <span class="label">Speed</span>
      <span class="value">${wpmVal} <abbr title="Words Per Minute">WPM</abbr></span>
    </div>

    <dl class="result-grid" aria-label="Performance Details">
      <div class="metric">
        <dt>Accuracy</dt>
        <dd><strong>${accuracyVal}%</strong></dd>
      </div>
      <div class="metric">
        <dt>Mistakes</dt>
        <dd><strong>${mistakeVal}</strong></dd>
      </div>
      <div class="metric">
        <dt>Length</dt>
        <dd><strong>${lenVal} <abbr title="characters">chars</abbr></strong></dd>
      </div>
    </dl>

    <details class="result-details">
      <summary aria-label="Toggle typed snippet preview">View Typed Text</summary>
      <p class="result-paragraph">${paragraphVal}</p>
    </details>
  `;

  return card;
}

/* -------------------------
   SEO & Rich Snippets Sync
   ------------------------- */

/**
 * Injects dynamic ItemList Structured Data (JSON-LD) for SEO Rich Snippets.
 * @param {Array} results 
 */
function updateDynamicSEO(results) {
  if (!results.length) return;

  const existingScript = document.getElementById("dynamic-results-schema");
  if (existingScript) existingScript.remove();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "User Typing Performance History",
    "numberOfItems": results.length,
    "itemListElement": results.slice(0, 10).map((res, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": `Test Speed: ${res.wpm || 0} WPM (${res.accuracy || 0}% Accuracy)`
    }))
  };

  const script = document.createElement("script");
  script.id = "dynamic-results-schema";
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schemaData);
  document.head.appendChild(script);
}

/* -------------------------
   DOM Render Logic
   ------------------------- */

/**
 * Renders saved typing results efficiently with Zero Layout Shift (CLS) & Batch Reflow.
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
        No typing tests recorded yet. Complete your first test to track WPM & Accuracy progress!
      </p>
      <a href="./index.html#typing" class="btn btn-primary" aria-label="Start your first typing test now">
        Start Typing Test
      </a>
    `;

    resultContainer.appendChild(emptyState);
    return;
  }

  /* Fragment batching via requestAnimationFrame for 60fps Rendering */
  window.requestAnimationFrame(() => {
    const fragment = document.createDocumentFragment();

    results.forEach((data, index) => {
      const card = createResultCard(data, index);
      fragment.appendChild(card);
    });

    resultContainer.appendChild(fragment);
    updateDynamicSEO(results);
  });
}

/* -------------------------
   Accessible Theme Engine
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

function applyTheme(theme) {
  if (!theme) return;
  body.setAttribute("data-theme", theme);

  if (themeSelect) {
    themeSelect.value = theme;
  }
}

function initializeTheme() {
  const savedTheme = getSavedTheme();

  if (savedTheme) {
    applyTheme(savedTheme);
    return;
  }

  // Fallback to System dark/light color scheme preference
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

/* -------------------------
   Event Listeners Setup
   ------------------------- */

if (themeSelect) {
  themeSelect.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;
    applyTheme(selectedTheme);
    saveTheme(selectedTheme);
  });
}

// System theme dynamic update listener
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
