/* =========================================================
MastType Pro — Results JavaScript
Performance • Accessibility • Error Handling • Theme
========================================================= */

/* =========================================================
DOM ELEMENTS
========================================================= */

const resultContainer = document.querySelector(".results");
const themeBtn = document.querySelector(".theme-btn");
const body = document.body;

/* =========================================================
CONSTANTS
========================================================= */

const STORAGE_KEY = "MastType_User_Data_dvk";
const THEME_KEY = "MastType_Theme_dvk";

/* =========================================================
RESULT DATA
========================================================= */

function getResults() {

 
try {

    const storedResults =
        localStorage.getItem(STORAGE_KEY);

    if (!storedResults) {
        return [];
    }

    const parsedResults =
        JSON.parse(storedResults);

    return Array.isArray(parsedResults)
        ? parsedResults
        : [];

} catch (error) {

    console.error(
        "MastType Pro: Unable to read saved results.",
        error
    );

    return [];
}
 

}

/* =========================================================
SAFE VALUE
========================================================= */

function safeValue(value, fallback = "—") {

 
if (
    value === undefined ||
    value === null ||
    value === ""
) {
    return fallback;
}

return String(value);
 

}

/* =========================================================
CREATE RESULT CARD
========================================================= */

function createResultCard(data, index) {

 
const result = document.createElement("article");

result.className = "result";

result.setAttribute(
    "aria-label",
    `Typing test result ${index + 1}`
);


/* -------------------------
   WPM
------------------------- */

const wpm = document.createElement("h3");

wpm.textContent =
    `Speed: ${safeValue(data.wpm)} WPM`;


/* -------------------------
   Accuracy
------------------------- */

const accuracy = document.createElement("p");

accuracy.textContent =
    `Accuracy: ${safeValue(data.accuracy)}%`;


/* -------------------------
   Paragraph Length
------------------------- */

const paragraphLength =
    document.createElement("p");

paragraphLength.textContent =
    `Paragraph Length: ${safeValue(
        data.paragraphLength
    )} characters`;


/* -------------------------
   Paragraph
------------------------- */

const paragraphLabel =
    document.createElement("h4");

paragraphLabel.textContent =
    "Paragraph";


const paragraph =
    document.createElement("p");

paragraph.className =
    "result-paragraph";

paragraph.textContent =
    safeValue(
        data.paragraph,
        "No paragraph available."
    );


/* -------------------------
   Mistakes
------------------------- */

const mistype =
    document.createElement("p");

mistype.textContent =
    `Mistakes: ${safeValue(
        data.mistype
    )} characters`;


/* -------------------------
   Time
------------------------- */

const time =
    document.createElement("time");

const savedDate =
    safeValue(
        data.timedDate,
        "Unknown"
    );

time.textContent =
    `Time: ${savedDate}`;

time.setAttribute(
    "aria-label",
    `Test time: ${savedDate}`
);


/* =====================================================
   APPEND
===================================================== */

result.append(
    wpm,
    accuracy,
    paragraphLength,
    paragraphLabel,
    paragraph,
    mistype,
    time
);


return result;
 

}

/* =========================================================
RENDER RESULTS
========================================================= */

function renderResults() {

 
if (!resultContainer) {
    return;
}


const results =
    getResults();


/* Clear old results */

resultContainer.replaceChildren();


/* Empty state */

if (results.length === 0) {

    const emptyMessage =
        document.createElement("p");

    emptyMessage.className =
        "empty-results";

    emptyMessage.textContent =
        "No typing tests yet. Complete a test to see your results.";

    emptyMessage.setAttribute(
        "role",
        "status"
    );

    resultContainer.appendChild(
        emptyMessage
    );

    return;
}


/* DocumentFragment prevents
   unnecessary repeated DOM updates */

const fragment =
    document.createDocumentFragment();


results.forEach((data, index) => {

    const card =
        createResultCard(
            data,
            index
        );

    fragment.appendChild(card);

});


resultContainer.appendChild(
    fragment
);
 

}

/* =========================================================
THEME
========================================================= */

function getSavedTheme() {

 
try {

    return localStorage.getItem(
        THEME_KEY
    );

} catch {

    return null;
}
 

}

function saveTheme(theme) {

 
try {

    localStorage.setItem(
        THEME_KEY,
        theme
    );

} catch {

    /* localStorage may be unavailable */
}
 

}

/* =========================================================
UPDATE THEME UI
========================================================= */

function updateThemeUI(isDark) {

 
if (!themeBtn) {
    return;
}


themeBtn.classList.toggle(
    "active-theme-dark",
    isDark
);


themeBtn.setAttribute(
    "aria-pressed",
    String(isDark)
);


themeBtn.setAttribute(
    "aria-label",
    isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
);


themeBtn.setAttribute(
    "title",
    isDark
        ? "Switch to light mode"
        : "Switch to dark mode"
);
 

}

/* =========================================================
APPLY THEME
========================================================= */

function applyTheme(theme) {

 
const isDark =
    theme === "dark";


body.dataset.isDark =
    String(isDark);


updateThemeUI(
    isDark
);
 

}

/* =========================================================
INITIAL THEME
========================================================= */

function initializeTheme() {

 
const savedTheme =
    getSavedTheme();


/* User's saved preference */

if (
    savedTheme === "dark" ||
    savedTheme === "light"
) {

    applyTheme(
        savedTheme
    );

    return;
}


/* System preference fallback */

const prefersDark =
    window.matchMedia &&
    window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;


applyTheme(
    prefersDark
        ? "dark"
        : "light"
);
 

}

/* =========================================================
THEME BUTTON
========================================================= */

if (themeBtn) {

 
themeBtn.addEventListener(
    "click",
    () => {

        const isCurrentlyDark =
            body.dataset.isDark === "true";


        const newTheme =
            isCurrentlyDark
                ? "light"
                : "dark";


        applyTheme(
            newTheme
        );


        saveTheme(
            newTheme
        );

    }
);
 

}

/* =========================================================
INITIALIZE APP
========================================================= */

initializeTheme();

renderResults();
