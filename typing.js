let textContainer = document.querySelector(".type-able-text"); //getting type-able-text for user
let restartButton = document.querySelector(".restart-button");
let typingArea = document.querySelector(".typing-area");
let startType = document.querySelector(".start-typing");
let oldResultContainer = document.querySelector(".resultContainer");
let mainArea = document.querySelector("main");

let userTextContainer = document.querySelector(".user"); // userText here container

const result = {}; // user latest match result here.
const paragraph = [
  "The sun shines brightly, and birds sing across the quiet valley.",
  "A gentle breeze moves softly, while leaves dance beneath trees.",
  "Children laugh happily, and friends share stories near gardens.",
  "The river flows calmly, carrying reflections of clouds above.",
  "Morning light enters windows, and everyone starts work peacefully.",
  "A curious cat watches silently, while butterflies cross the yard.",
  "Fresh flowers bloom beautifully, and their fragrance fills the air.",
  "People walk together, enjoying conversations during the pleasant evening.",
  "The library remains quiet, while students read books carefully.",
  "Rain falls lightly, and small puddles appear beside pathways.",
  "A warm cup rests nearby, while music plays in background.",
  "The forest feels peaceful, and birds nest among branches.",
  "Stars sparkle gently, while the moon lights distant hills.",
  "Neighbors greet kindly, and smiles spread across the street.",
  "The garden grows steadily, while vegetables ripen under sunlight.",
  "A young artist sketches patiently, and ideas fill pages.",
  "The bakery smells wonderful, while fresh bread cools nearby.",
  "Clouds drift slowly, and the sky appears calm today.",
  "Students practice daily, while teachers guide them with patience.",
  "The train arrives smoothly, and passengers board without hurry.",
  "A playful dog runs freely, while children chase behind.",
  "The lake remains clear, and fish swim beneath waves.",
  "People gather together, while laughter echoes through the hall.",
  "The morning feels refreshing, and everyone enjoys the weather.",
  "A traveler rests briefly, while planning another exciting journey.",
  "The market stays busy, and vendors welcome customers warmly.",
  "Fresh fruits look colorful, while shoppers explore different stalls.",
  "The path stretches ahead, and explorers continue walking confidently.",
  "A small bird lands nearby, while flowers sway gently.",
  "The classroom feels lively, and discussions inspire new ideas.",
  "The evening sky glows orange, while shadows grow longer.",
  "A musician performs beautifully, and listeners applaud with excitement.",
  "The ocean appears endless, while waves reach the shore.",
  "People celebrate together, and happiness fills every corner nearby.",
  "The campfire burns warmly, while friends share memorable stories.",
  "A painter works carefully, and colors blend across canvas.",
  "The town remains peaceful, while lights shine after sunset.",
  "Fresh air feels pleasant, and trees provide welcome shade.",
  "The road curves gently, while travelers admire scenic views.",
  "A chef cooks skillfully, and delicious aromas spread everywhere.",
  "The mountain stands proudly, while clouds surround its peak.",
  "People exercise regularly, and healthy habits improve daily life.",
  "The playground stays active, while children enjoy every moment.",
  "A writer thinks deeply, and words appear on pages.",
  "The waterfall sounds soothing, while nature feels completely alive.",
  "Friends meet often, and conversations create lasting memories together.",
  "The morning begins quietly, while sunlight reaches distant fields.",
  "A cyclist rides steadily, and the journey feels enjoyable.",
  "The park looks beautiful, while families relax under trees.",
  "Fresh coffee tastes excellent, and energy returns quickly afterward.",
  "The village remains charming, while traditions continue through generations.",
  "A student studies carefully, and progress becomes clearly visible.",
  "The beach feels relaxing, while waves create calming sounds.",
  "People help each other, and communities grow much stronger.",
  "The garden path winds gently, while flowers bloom beside.",
  "A photographer waits patiently, and captures perfect moments outdoors.",
  "The evening remains cool, while stars appear one above another.",
  "Fresh rain refreshes nature, and every leaf looks brighter.",
  "The city stays active, while lights illuminate busy streets.",
  "A runner moves quickly, and determination guides every step.",
  "The countryside appears peaceful, while animals graze across fields.",
  "People share kindness, and simple gestures brighten many days.",
  "The bookstore feels welcoming, while readers browse countless titles.",
  "A sailor watches carefully, and the sea remains calm.",
  "The picnic continues happily, while families enjoy delicious meals.",
  "Fresh vegetables arrive daily, and markets remain well stocked.",
  "The sky clears gradually, while sunshine returns after rain.",
  "A child learns eagerly, and curiosity leads new discoveries.",
  "The museum attracts visitors, while history comes alive inside.",
  "People travel widely, and experiences broaden their perspectives greatly.",
  "The meadow looks colorful, while wildflowers cover open land.",
  "A gardener works diligently, and plants thrive throughout seasons.",
  "The festival feels exciting, while music fills every street.",
  "Fresh water flows steadily, and nature supports countless lives.",
  "The bridge connects communities, while travelers cross safely daily.",
  "A teacher explains clearly, and students understand concepts better.",
  "The harbor remains busy, while boats arrive from afar.",
  "People appreciate beauty, and art inspires creative thinking everywhere.",
  "The sunrise appears magnificent, while colors spread across horizon.",
  "A family gathers happily, and shared moments become treasured.",
  "The forest trail continues ahead, while wildlife stays nearby.",
  "Fresh bread smells inviting, and breakfast begins with smiles.",
  "The concert attracts crowds, while performers deliver memorable shows.",
  "People remain optimistic, and challenges become opportunities for growth.",
  "The garden fountain sparkles beautifully, while water flows gently.",
  "A traveler explores freely, and every destination feels unique.",
  "The classroom encourages learning, while creativity grows every day.",
  "Fresh flowers decorate tables, and rooms appear more cheerful.",
  "The mountain air feels crisp, while views remain stunning.",
  "People enjoy teamwork, and cooperation leads to better results.",
  "The evening breeze feels pleasant, while lights brighten homes.",
  "A reader turns pages slowly, and imagination travels widely.",
  "The market square stays lively, while visitors explore shops.",
  "Fresh juice tastes refreshing, and everyone enjoys the flavor.",
  "The journey continues smoothly, while excitement remains throughout travel.",
  "People celebrate achievements, and success motivates future efforts.",
  "The quiet night feels peaceful, while stars shine overhead.",
  "A friendly smile appears often, and kindness spreads naturally."

]; //paragraph for user type-able

let text;
let copyText;
let typo;
let userText;
let isTimeOn;
let startTime;



let intervalId;

const start = () => {
   
  text = paragraph[Math.floor(Math.random() * paragraph.length)]; //for getting random paragraph
  clearInterval(intervalId);
  startType.style.color = "Grey";
  restartButton.style.display = "inline-block";
  userText = ""; //user text string
  typo = 0; //user mistakes
  copyText = text;
  textContainer.innerText = "";
  userTextContainer.innerText = "";
  //  console.log(oldResultContainer)
  //  if (oldResultContainer) {
  //   typingArea.appendChild(presskeyPara);
  //   typingArea.removeChild(oldResultContainer)
  //  }

  isTimeOn = false; //checking timer is on or off
  time = 0; //store how time in user type paragraph.
  intervalId; //interval id

  for (let i = 0; i < text.length; i++) {
    //creating styled elements of type able characters.
    let textContainerChild = document.createElement("span");
    textContainerChild.classList.add("char");
    textContainerChild.innerText = text[i];
    textContainer.appendChild(textContainerChild);
  }
};
document.addEventListener("keydown", (event) => {
  //adding event listener
  let userTypedChar = document.createElement("span"); //creating element for user type a char

  userTextContainer.appendChild(userTypedChar); //appending child usertype char to userTextContainer.

  if (event.key !== text[0]) {
    //if event.key !== text[0] means userChar is typo.
    if (text === "") {
      //text === '' means type able text is finish

      return;
    }
    if (event.key === "Shift") {
      return;
    }
    if (event.key === "Backspace") {
      return;
    }
    typo++;
    userTypedChar.classList.add("error");
    //return;
  }

  if (!isTimeOn) {
    startTime = Date.now();
    isTimeOn = true;
  }

  
  // let child = document.createElement("span");

  userTypedChar.classList.add("userChar"); //when userTypeChar is correct when creating element (yaha se)
  userTypedChar.innerText = text[0];
  userText += text[0];
  text = text.slice(1);
  textContainer.firstChild.remove(); //remove type able of 0th indexed char and child form type able value

  userTextContainer.appendChild(userTypedChar); //yaha tak.
  if (text === "") {
    clearInterval(intervalId);
    let nowLatestTime = new Date();

    result.time  = Math.floor((Date.now() - startTime) / 1000); //pushing time in second in result
    result.length = copyText.length; //pushing word length in result.
    result.wpm = Math.floor((copyText.length / 5 / result.time) * 60 ); //pushing wpm in result
    result.accuracy = (100 - (typo / copyText.length) * 100).toFixed(2);
   
    resultContainer();
    return;
  }
});

const resultContainer = () => {
  let resultContainer = document.createElement("section");
  resultContainer.classList.add("resultContainer");
  resultContainer.ariaLabel="Typing Statistics";
  typingArea.appendChild(resultContainer);
  let countDown = 5;

  let wpmContainer = document.createElement("h3");
  let accContainer = document.createElement("h3");
  let wordLengthContainer = document.createElement("h3");
  let timeContainer = document.createElement("h3");
  let countDownContainer = document.createElement("h3");
  let resultRestartButton = document.createElement("button");

  resultRestartButton.addEventListener("click", () => {
    start();
    typingArea.removeChild(resultContainer);
  });

  resultRestartButton.innerText = `Restart`;
  wpmContainer.innerText = `Speed: ${result.wpm} WPM`;
  accContainer.innerText = `Accuracy :${result.accuracy} %`;
  wordLengthContainer.innerText = `Word Length : ${result.length} character`;
  timeContainer.innerText = `Time : ${result.time} second`;
  countDownContainer.innerText = `Restart in ${countDown}`;

  wpmContainer.classList.add("result", "wpm");
  resultRestartButton.classList.add("result", "result-restart-btn");
  accContainer.classList.add("result", "acc");
  wordLengthContainer.classList.add("result", "word-length");
  timeContainer.classList.add("result", "time-container");
  countDownContainer.classList.add("result", "countdown");

  resultContainer.appendChild(wpmContainer);
  resultContainer.appendChild(accContainer);
  resultContainer.appendChild(wordLengthContainer);
  resultContainer.appendChild(timeContainer);
  // resultContainer.appendChild(countDownContainer);
  resultContainer.appendChild(resultRestartButton);

  // resultContainer.innerHTML += `<button onClick="start()" class="restart-button">Restart</button>`

  startType.style.color = "transparent";
  restartButton.style.display = "none";

  // let countDownInterval = setInterval(() => {

  //   countDownContainer.innerText = `Restart in ${countDown}`;

  //   if (countDown === 0) {
  //     clearInterval(countDownInterval);
  //     typingArea.removeChild(resultContainer);
  //     start()
  //   }
  //   countDown--
  // },1000)
};
start();

// const removeResult = () => {
//   typingArea.removeChild(resultContainer);

// }
