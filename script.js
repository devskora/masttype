const Results = [
  //user Score
  { wpm: 20, accuracy: 98, rank: "Beginner" },
  { wpm: 80, accuracy: 98, rank: "Advanced" },
  { wpm: 100, accuracy: 98, rank: "Expert" },

  { wpm: 60, accuracy: 98, rank: "Intermediate" },

  { wpm: 120, accuracy: 98, rank: "Elite" },
  { wpm: 160, accuracy: 58, rank: "Grandmaster" },
  { wpm: 40, accuracy: 98, rank: "Learner" },
  { wpm: 180, accuracy: 40, rank: "Legend" },
  { wpm: 140, accuracy: 98, rank: "Master" },

  { wpm: 200, accuracy: 98, rank: "Mythic" },
];
let maxWPM = 0;
let p1 = 100 / maxWPM;
for (let i = 0; i < Results.length; i++) {
  if (Results[i].wpm > maxWPM) {
    maxWPM = Results[i].wpm;
    p1 = (100 / maxWPM) * 2.85;
  }
}

console.log(maxWPM);
const Quotes = [,
"Success comes through patience, effort, learning, growth, and persistence.",
"Every challenge teaches lessons that guide future success and achievement.",
"Consistent practice builds confidence, skills, discipline, and lasting success.",
"Small improvements daily create remarkable results and meaningful success.",
"Focused effort transforms dreams into goals, progress, and success.",
"Successful people learn continuously, adapt quickly, and remain determined.",
"Dedication and hard work often produce rewarding success eventually.",
"Positive habits strengthen character, increase productivity, and encourage success.",
"Clear goals provide direction, motivation, purpose, and future success.",
"Success grows steadily when persistence overcomes obstacles and setbacks.",
]; // some quotes

let quotesContainer = document.querySelector(".quotes"); //selected .quotes container
let ResultsContainer = document.querySelector(".result"); //selected .result container
Results.map((result) => {
  //creating graph by user score
  let graph = document.createElement("div");
  let tooltip = document.createElement("span");

  tooltip.classList.add("tooltip");
  tooltip.innerText = `${result.rank}`;

  graph.innerText = `${result.wpm} WPM`;
  graph.style.height = `${p1 * result.wpm}px`;
  graph.classList.add("graph-stick");
  graph.appendChild(tooltip);
  ResultsContainer.appendChild(graph);
});

Quotes.map((quotePara) => {
  //showing quotes for user feel good.
  let quote = document.createElement("p");
  quote.innerText = quotePara;
  quote.classList.add("quote");
  quotesContainer.appendChild(quote);
});
