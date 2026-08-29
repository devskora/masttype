

// const USER_DATA_KEY = "MastType_User_Data_dvk";

// function getUserData() {
// try {
// const data = JSON.parse(localStorage.getItem(USER_DATA_KEY));

// return Array.isArray(data) ? data.slice(-100) : [];
// } catch (error) {
// console.warn("Could not read user data:", error);
// return [];
// }
// }
// let userData = getUserData();

// /* =========================================================
// ELEMENTS
// ========================================================= */

// const themeBtn = document.querySelector(".theme-btn");
// const body = document.body;
// const typingArea = document.querySelector(".paragraph-area");

// const paragraphContainer = document.querySelector(".paragraph");
// const typeAbleText = document.querySelector(".type-able-text");
// const userTyped = document.querySelector(".typed");

// const timeController = document.querySelector(".time-controller");
// const wordController = document.querySelector(".word-controller");
// const timeWord = document.querySelector(".time-word");

// const typingResultContainer = document.querySelector(".typing");

// const typingStatus = document.querySelector("#typing-status");

// /* =========================================================
// THEME
// ========================================================= */

// const THEME_KEY = "MastType_Theme";

// function applyTheme(theme) {

// const isDark = theme === "dark";

// body.dataset.isDark = String(isDark);

// themeBtn.classList.toggle("active-theme-dark", isDark);

// themeBtn.setAttribute(
// "aria-label",
// isDark
// ? "Switch to light mode"
// : "Switch to dark mode"
// );

// themeBtn.setAttribute(
// "aria-pressed",
// String(isDark)
// );
// }

// /*

// Load saved theme.

// If there is no saved preference:
// use the user's system preference.
// */
// function loadTheme() {
// const savedTheme = localStorage.getItem(THEME_KEY);

// if (savedTheme === "dark" || savedTheme === "light") {

// applyTheme(savedTheme);

// return;
// }
// const prefersDark =
// window.matchMedia &&
// window.matchMedia("(prefers-color-scheme: dark)").matches;

// applyTheme(prefersDark ? "dark" : "light");
// }

// /* Theme button */

// themeBtn.addEventListener("click", () => {

// const isCurrentlyDark =
// body.dataset.isDark === "true";

// const newTheme =
// isCurrentlyDark ? "light" : "dark";

// applyTheme(newTheme);

// /*

// Save preference permanently in this browser.
// */
// localStorage.setItem(THEME_KEY, newTheme);
// });
// loadTheme();
// /* =========================================================
// TEST STATE
// ========================================================= */

// let typedText = "";
// let paragraph = "";
// let historyParagraph = "";

// let mistype = 0;

// let thisTest = {};

// const word$Time = {
// word: Number(wordController.value) || 10,
// time: Number(timeController.value) || 10
// };

// /* =========================================================
// TIMER
// ========================================================= */

// const time = {

// isTimerOn: false,

// start: null,

// end: null,

// startTime() {
// return Date.now();
// },

// endTime() {
// return Date.now();
// },

// duration() {

// if (
//   typeof this.start !== "number" ||
//   typeof this.end !== "number"
// ) {
//   return 0;
// }

// return Math.max(0, this.end - this.start);
// }
// };
// /* =========================================================
// TYPING
// ========================================================= */

// function userType(event) {

// /*

// Only allow typing while typing area is focused.
// */
// if (typingArea.dataset.focus !== "true") {
// return;
// }
// /*
// Ignore modifier keys and special keys.
// */
// if (
// event.ctrlKey ||
// event.metaKey ||
// event.altKey ||
// event.key === "Shift" ||
// event.key === "Control" ||
// event.key === "Alt" ||
// event.key === "Meta" ||
// event.key === "Tab" ||
// event.key === "CapsLock" ||
// event.key === "Escape"
// ) {
// return;
// }
// /*
// Backspace is disabled for this typing test.
// */
// if (event.key === "Backspace") {
// event.preventDefault();
// return;
// }
// /*
// Only process one-character keys.
// */
// if (event.key.length !== 1) {
// return;
// }
// event.preventDefault();
// /*

// Don't allow typing after test completion.
// */
// if (!paragraph.length) {
// return;
// }
// const expectedCharacter = paragraph[0];
// const typedCharacter = event.key;
// /*

// Start timer on first correct character.
// */
// if (!time.isTimerOn) {
// if (typedCharacter !== expectedCharacter) {
//   return;
// }

// time.start = time.startTime();
// time.isTimerOn = true;
// }
// /*

// Correct character
// */
// if (typedCharacter === expectedCharacter) {
// const span = document.createElement("span");
// span.className = "typed-character";

// span.textContent = typedCharacter;

// userTyped.appendChild(span);

// typedText += typedCharacter;
// }
// /*

// Wrong character
// */
// else {
// const span = document.createElement("span");
// span.className = "wrong-character";

// span.textContent = typedCharacter;

// userTyped.appendChild(span);

// /*
//  * Store the typed character for display,
//  * but remove the expected character from
//  * the remaining paragraph.
//  */
// typedText += typedCharacter;

// mistype++;
// }
// paragraph = paragraph.slice(1);

// typeAbleText.textContent = paragraph;

// /*

// Test completed.
// */
// if (paragraph.length === 0) {
// finishTest();
// }
// }
// /* Keyboard listener */

// document.addEventListener("keydown", userType);

// /* =========================================================
// FINISH TEST
// ========================================================= */

// function finishTest() {

// typingArea.dataset.focus = "false";

// body.dataset.overflow = "show";

// time.end = time.endTime();

// time.isTimerOn = false;

// const duration = time.duration();

// const durationSeconds = duration / 1000;

// /*

// Prevent division by zero.
// */
// const safeDurationSeconds =
// Math.max(durationSeconds, 0.001);
// const wpm = Math.round(
// (historyParagraph.length / 5) /
// safeDurationSeconds *
// 60
// );
// const accuracy = Math.max(
// 0,
// Math.round(
// 100 -
// (mistype / Math.max(historyParagraph.length, 1)) * 100
// )
// );

// const latestDate = new Date();

// thisTest = {

// wpm,

// paragraph: historyParagraph,

// paragraphLength: historyParagraph.length,

// duration,

// mistype,

// accuracy,

// timedDate: latestDate.toISOString()
// };
// /*

// Save only latest 100 tests.
// */
// userData.push(thisTest);
// userData = userData.slice(-100);
// try {

// localStorage.setItem(
//   USER_DATA_KEY,
//   JSON.stringify(userData)
// );
// } catch (error) {
// console.warn(
//   "Could not save test result:",
//   error
// );
// }
// /*

// Screen-reader status.
// */
// if (typingStatus) {
// typingStatus.textContent =
//   `Test complete. Speed ${wpm} words per minute. Accuracy ${accuracy} percent.`;
// }
// userTyped.textContent = "";

// typeAbleText.textContent = "";

// paragraph = "";

// getResult(thisTest);
// }

// /* =========================================================
// RESTART TEST
// ========================================================= */

// function isRestart() {

// /*

// Remove old result if it exists.
// */
// const oldResult =
// document.querySelector(".result");
// if (oldResult) {
// oldResult.remove();
// }
// /*

// Reset typing state.
// */
// typedText = "";
// mistype = 0;
// time.isTimerOn = false;

// time.start = null;

// time.end = null;

// /*

// Select random paragraph.
// */
// const randomIndex =
// Math.floor(Math.random() * Paragraphes.length);
// const selectedParagraph =
// Paragraphes[randomIndex];
// /*

// Create test text according to
// selected word count.

// 5 characters ≈ 1 word.
// */
// const maxCharacters =
// Math.max(1, Number(word$Time.word) * 5);
// paragraph =
// selectedParagraph.slice(0, maxCharacters);
// historyParagraph = paragraph;

// /*

// Reset UI.
// */
// userTyped.textContent = "";
// typeAbleText.textContent = paragraph;
// /*

// Activate typing area.
// */
// typingArea.dataset.focus = "true";
// body.dataset.overflow = "show";
// if (typingStatus) {

// typingStatus.textContent =
//   "Typing test restarted. Start typing.";
// }
// }
// /* =========================================================
// TYPING AREA FOCUS
// ========================================================= */

// let isFocus = false;

// typingArea.addEventListener("click", () => {

// isFocus = !isFocus;

// typingArea.dataset.focus =
// String(isFocus);

// /*

// Don't use another toggle here.

// Original code was toggling the value twice,
// causing inconsistent focus state.
// */
// body.dataset.overflow =
// isFocus ? "show" : "hide";
// });
// /* =========================================================
// WORD / TIME MODE
// ========================================================= */

// let isTime = true;

// /*

// Current UI only supports word mode properly.
// Time controls can be enabled later when the
// countdown logic is implemented.
// */
// timeController.disabled = true;
// wordController.disabled = false;
// timeWord.addEventListener("click", () => {

// isTime = !isTime;

// if (isTime) {

// timeWord.textContent = "Time";

// timeController.disabled = true;

// wordController.disabled = false;

// timeWord.setAttribute(
//   "aria-pressed",
//   "true"
// );
// } else {
// timeWord.textContent = "Word";

// timeController.disabled = false;

// wordController.disabled = true;

// timeWord.setAttribute(
//   "aria-pressed",
//   "false"
// );
// }
// /*

// Start a fresh test after mode change.
// */
// isRestart();
// });
// /* =========================================================
// WORD COUNT
// ========================================================= */
// wordController.addEventListener("change", () => {

// const selectedWords =
// Number(wordController.value);

// if (!Number.isFinite(selectedWords)) {
// return;
// }

// word$Time.word = selectedWords;

// isRestart();
// });

// /* =========================================================
// RESULT
// ========================================================= */

// function getResult(testResult) {

// /*

// Prevent duplicate result overlays.
// */
// const existingResult =
// document.querySelector(".result");
// if (existingResult) {
// existingResult.remove();
// }
// const result =
// document.createElement("section");

// result.className = "result";

// result.setAttribute(
// "aria-label",
// "Typing test result"
// );

// const speed =
// document.createElement("p");

// speed.textContent =`
// Speed: ${testResult.wpm} WPM`;

// const accuracy =
// document.createElement("p");

// accuracy.textContent =
// `Accuracy: ${testResult.accuracy}%`;

// const words =
// document.createElement("p");

// words.textContent =`
// Length: ${testResult.paragraphLength} characters`;

// const mistypeElement =
// document.createElement("p");

// mistypeElement.textContent =`
// Mistypes: ${testResult.mistype}`;

// const restartButton =
// document.createElement("button");

// restartButton.type = "button";

// restartButton.className =
// "result-restart-btn btn";

// restartButton.setAttribute(
// "aria-label",
// "Restart typing test"
// );

// restartButton.title =
// "Restart typing test";

// /*

// Create SVG safely instead of inserting
// unnecessary HTML.
// */
// restartButton.innerHTML = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" >  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/> <path d="M3 3v5h5"/> </svg> ;
// result.appendChild(speed);
// result.appendChild(accuracy);

// result.appendChild(words);

// result.appendChild(mistypeElement);

// result.appendChild(restartButton);

// typingResultContainer.appendChild(result);

// restartButton.addEventListener(
// "click",
// exitFromResult
// );

// /*

// Put keyboard focus on restart button
// so keyboard/screen-reader users can access it.
// */
// restartButton.focus();
// }
// /* =========================================================
// EXIT RESULT
// ========================================================= */
// function exitFromResult() {

// const result =
// document.querySelector(".result");

// if (result) {
// result.remove();
// }

// isRestart();
// }

// /* =========================================================
// INITIALIZE
// ========================================================= */

// isRestart();






const Paragraphes = [`Success does not always come quickly. Sometimes we work hard for a long time without seeing a clear result. During such moments, patience becomes very important. A person who continues learning and improving can eventually make progress. Success is not only about winning or reaching a final goal. It is also about becoming better than we were yesterday. Small improvements may seem unimportant at first, but they can become significant after months of consistent effort. Instead of comparing ourselves with others, it is better to focus on our own progress. Hard work, patience, discipline, and a positive attitude can help us move forward.`,`A healthy lifestyle includes several simple habits that support our everyday activities. Eating a variety of nutritious foods, drinking enough water, getting sufficient sleep, and staying physically active are important parts of a balanced life. Exercise can help improve strength, stamina, coordination, and overall fitness. Rest is equally important because the body and mind need time to recover. Good habits do not need to be complicated. Taking a walk, playing a sport, stretching, or spending time outdoors can be useful activities. The goal should be to build habits that are realistic and sustainable. A balanced lifestyle can help us feel energetic and focused.`,
`School is an important place for learning, but education is not limited to classrooms. Students learn from teachers, books, friends, experiences, experiments, and even mistakes. School also provides opportunities to develop communication, teamwork, responsibility, and problem-solving skills. Sometimes a subject may seem boring or difficult, but understanding its practical importance can make it more interesting. Asking questions is a good way to understand confusing topics. Students should not be afraid of making mistakes because mistakes are a natural part of learning. A curious student can learn something new from almost every situation and gradually develop a stronger understanding of the world.`,
`The internet has changed the way people communicate and share information. A message can travel across the world within seconds, and people can learn about events happening in distant places. Students can use online resources to understand difficult topics, practice skills, and find educational material. However, not everything found online is accurate. It is important to check information before believing or sharing it. People should also protect their personal information and use strong passwords for their accounts. Responsible internet use means knowing both its benefits and its risks. When used carefully, the internet can be a powerful tool for learning and communication.`,
`A good friend can make ordinary days more enjoyable. Friendship is built through trust, respect, honesty, and understanding. Good friends support each other during difficult moments and celebrate each other's achievements. They may have different opinions, hobbies, or personalities, but they can still respect one another. A strong friendship does not require constant agreement. Sometimes friends can disagree and then solve the problem by communicating calmly. It is also important to be a good listener instead of always talking about ourselves. True friendship grows through shared experiences and mutual care. Treating others kindly can help create meaningful and lasting relationships.`,
`The night sky has fascinated people for thousands of years. When we look upward on a clear night, we can see the Moon, stars, and sometimes bright planets. Space is incredibly large, containing countless stars and galaxies. Scientists use powerful telescopes and spacecraft to learn more about the universe. They study planets, stars, black holes, and many other objects. Space exploration has also helped humans develop useful technologies and understand Earth better. There are still many unanswered questions about the universe. As science advances, future generations may discover new information that changes our understanding of space and our place within it.`,
`Reading and writing are important skills that help us communicate ideas. Reading exposes us to new words, information, opinions, and stories. Writing allows us to organize our thoughts and explain them clearly to other people. Both skills improve with regular practice. Instead of worrying about making every sentence perfect, beginners should focus on expressing their ideas clearly. Over time, grammar, vocabulary, and sentence structure can improve naturally through practice. Keeping a small journal or writing short paragraphs every day can be useful. Even a few minutes of daily writing can gradually make communication more confident, organized, and effective.`,
`Teamwork is necessary in many areas of life. A team can combine different skills and ideas to solve problems more effectively. Good teamwork requires communication, cooperation, responsibility, and respect. Every member should understand their role and contribute to the shared goal. Sometimes people may disagree about the best approach, but listening to different opinions can lead to better solutions. A successful team does not depend on one person doing everything. Instead, members support one another and use their individual strengths. Learning to work with others is useful at school, in sports, at work, and in many everyday situations.`,
`Mistakes are often treated as failures, but they can also be valuable teachers. When something goes wrong, we have an opportunity to understand what happened and find a better approach. A programmer learns from coding errors, a student learns from incorrect answers, and an athlete learns from mistakes during practice. The important thing is to analyze the mistake instead of repeating it without understanding. Nobody performs perfectly all the time. Improvement usually happens through a combination of practice, mistakes, feedback, and correction. If we remain patient and keep trying, mistakes can become useful steps toward better performance and deeper understanding.`,

`A peaceful environment can make it easier to concentrate and think clearly. When a workspace is organized, it becomes easier to find important books, notes, or tools. Removing unnecessary distractions can also help improve focus. Before starting a task, it is useful to decide exactly what needs to be completed. Working on one important task at a time can prevent confusion. Short breaks can help maintain attention when studying or working for longer periods. Everyone has different preferences, so the best environment may vary from person to person. The main goal is to create a place where learning and productive work feel comfortable and manageable.`
];
let userData = JSON.parse(localStorage.getItem('MastType_User_Data_dvk')) ||[];
let freshUser = userData.slice(-100);
userData = freshUser;

  let thisTest = {};

// document.addEventListener('mousemove',(event) => {
// gsap.to('.cursor',{
// x: event.clientX,
// y: event.clientY,
// duration: .3,
// ease: 'elastic.out(1)',
// delay: .1,
// })
// })

//theme
let theme = localStorage.getItem("MastType_Theme_dvk") || "light";

const themeBtn = document.querySelector(".theme-btn");
const body = document.body;

/* -------------------------
Apply saved theme
------------------------- */

function applyTheme() {

 
const isDark = theme === "dark";

body.dataset.isDark = String(isDark);

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
 

}

/* -------------------------
Load saved theme
------------------------- */

applyTheme();

/* -------------------------
Theme toggle
------------------------- */

themeBtn.addEventListener("click", () => {

 
if (theme === "dark") {

    theme = "light";

} else {

    theme = "dark";

}


/* Apply theme */

applyTheme();


/* Save theme */

localStorage.setItem(
    "MastType_Theme_dvk",
    theme
);
 

});


//test

const paragraphContainer = document.querySelector(".paragraph");
const typeAbleText = document.querySelector(".type-able-text");
const userTyped = document.querySelector(".typed");
const typingArea = document.querySelector('.paragraph-area')

let typedText = "";
let paragraph = "";
let historyParagraph = "";
let mistype = 0;
const word$Time = {
word: 10,
time: 10,
}
let time = {
isTimerOn: false,
start: null,
end: null,
startTime: () => {
const startTime = new Date();
return Date.now();
},
endTime: () => {

const endTime = new Date();
return Date.now();
},
duration: () => {
return time.end-time.start;
},
}
function userType(event) {

if (typingArea.dataset.focus === 'true') {
if (event.key !== "Backspace" && event.key !== 'Shift') {

if (event.key === paragraph[0]) {
  if (time.isTimerOn === false) {

  time.start = time.startTime();
  time.isTimerOn = true;
  }
  userTyped.style.color = "green";

  paragraph = paragraph.slice(1, paragraph.length);

  typedText += event.key;
  typeAbleText.innerText = paragraph;
  userTyped.innerHTML += `<span class='typed-character'>${typedText[typedText.length-1]}</span>`;
} else {
  if (time.isTimerOn === false) {
    return;
  }
  userTyped.style.color = "red";
  typedText += paragraph[0];
  paragraph = paragraph.slice(1, paragraph.length);

  typeAbleText.innerText = paragraph;
  userTyped.innerHTML += `<span class='wrong-character'>${typedText[typedText.length-1]}</span>`;

  mistype++;
  lastCorrect = false;
}

if (paragraph.length === 0) {
  typingArea.dataset.focus = 'false'
  time.end = time.endTime();

  userTyped.innerText = ``;
  typeAbleText.innerText = '';

  let speed =  (historyParagraph.length/5)/(time.duration()/1000)*60;
  let latestDate = new Date()
  thisTest = {}
  thisTest.wpm = Math.round(((historyParagraph.length/5)/(time.duration()/1000)*60));
 thisTest.paragraph = historyParagraph;
 thisTest.paragraphLength = historyParagraph.length;
 thisTest.duration = time.duration();
 thisTest.mistype = mistype;
 thisTest.accuracy = 100-Math.floor(((mistype/(Math.floor(thisTest.paragraphLength)))*100));
 thisTest.timedDate = `${latestDate.getFullYear()}-${latestDate.getMonth()+1}-${latestDate.getDate()} ${latestDate.getHours()}:${latestDate.getMinutes()}`;
 console.log(thisTest.timedDate);
 paragraph = ''
 userTyped.innertext = userType;
  userData.push(thisTest);
  localStorage.setItem('MastType_User_Data_dvk',JSON.stringify(userData));
  getResult(thisTest);
}
} //else if (event.key === "Backspace") {
// paragraph = typedText[typedText.length - 1] + paragraph;
// console.log("then", typedText);
// typedText = typedText.slice(0, typedText.length - 1);
// console.log("now ", typedText);
// userTyped.innerText = typedText;
// typeAbleText.innerText = paragraph;

// typeAbleText.innerText = paragraph;
// }
}
}

document.addEventListener("keydown", (event) => {
userType(event);
});

function isRestart() {
typingArea.dataset.focus = 'true'

const result = document.querySelector('.result');
if (result === true) {


result.remove;
}
paragraph = Paragraphes[Math.floor(Math.random() * Paragraphes.length)];
paragraph = paragraph.slice(0,word$Time.word*5);
typedText = "";
userTyped.innerText = '';
historyParagraph = "";
mistype = 0;
time.isTimerOn = false;
time.start = null;
time.end = null;
typeAbleText.innerText = paragraph;
historyParagraph = paragraph;
}

localStorage.setItem("name", "dev");

//focus on type bar
let isFocus = false;

typingArea.addEventListener("click", (event) => {

if (isFocus) {
isFocus = false;
typingArea.dataset.focus = 'false';

body.dataset.overflow = 'hide';
} else {
isFocus = true;
typingArea.dataset.focus = 'true';
body.dataset.overflow = 'show';
}
typingArea.dataset.focus = `${typingArea.dataset.focus === "true" ? "false" : "true"}`;
});

//words-length quantity

const timeController = document.querySelector('.time-controller');
const wordController = document.querySelector('.word-controller');
const timeWord = document.querySelector('.time-word');
let isTime = true;
timeWord.addEventListener('click', () => {
if (isTime) {
// timeWord.innerText = 'Time';

// timeController.disabled = false;
// wordController.disabled = true;
isTime = false;
} else {
// timeWord.innerText = 'Word';

// timeController.disabled = true;
// wordController.disabled = false;
isTime = true;;
}
});
wordController.addEventListener('change', () => {
word$Time.word = wordController.value;
isRestart();



})
// timeController.addEventListener('change', () => {
// word$Time.time = timeController.value;
// isRestart();
// console.log(word$Time);
// })

//result

const typingResultContainer = document.querySelector('.typing');

function getResult(testResult) {
let result = document.createElement('section');
result.classList.add('result');
const speed = document.createElement('p');

const accuracy = document.createElement('p');

const words = document.createElement('p');

const mistype = document.createElement('p');

const restartButton = document.createElement('button');

speed.innerText = `Speed : ${Math.floor(thisTest.wpm)}wpm`;

accuracy.innerText = `Accuracy : ${thisTest.accuracy}%`;
restartButton.classList.add('result-restart-btn','btn')

restartButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>`;

words.innerText = `Length : ${thisTest.paragraphLength}Characters`;

mistype.innerText = `Mistype : ${thisTest.mistype}Characters`;

result.appendChild(speed);

result.appendChild(accuracy);

result.appendChild(words);

result.appendChild(mistype);

result.appendChild(restartButton)

typingResultContainer.appendChild(result);
const restartBtnFromResult = document.querySelector('.result-restart-btn');

restartBtnFromResult.addEventListener('click', () => {
exitFromResult();
})



}
isRestart();

function exitFromResult() {
const result = document.querySelector('.result');
result.remove();
isRestart();

}



