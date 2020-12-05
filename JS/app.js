const KEY = "a2418e41e3338e1bc4c146d60794abd0";
let searchText = "Dogs";

const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=12&page=1`;

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    getImageUrl(data.photos.photo);
  });

//pussla ihop bild urlen
function getImageUrl(photoArray) {
  let photos = photoArray;
  let size = "q";
  let imgUrls = [];
  // console.log(photos);

  for (let photo of photos) {
    let url = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    imgUrls.push(url);
  }

  setUrls(imgUrls);
}

//visa bilden
function setUrls(urls) {
  urls.push(...urls);
  console.log(urls); //tolv urler

  //Vi behöver de 24 img elementet med front-face klass
  //query select all - array med 24 element
  //loopa igenom alla 24 elementen
  //om du dubblar alla urlerna så att du har en array med 24 st urler
  let frontFace = document.querySelectorAll(".front-face");
  console.log(frontFace);
  for (i = 0; i < urls.length; i++) {
    frontFace[i].src = urls[i];
  }
}

const cards = document.querySelectorAll(".memory-card");

// När användare klickar, ta reda på om det är första eller a
//andra kortet så vi kan sätta matching logic.
let hasFlippedCard = false;
//ta bort bugg med att kunna klicka flera kort snabbt i följd.
let lockBoard = false;
let firstCard, secondCard;

//Funktion för att vända korten
function flipCard() {
  if (lockBoard) return;
  //console.log("i was clicked");
  //console.log(this);

  //Fixa bugg med dubbelklick
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCard) {
    //första click
    //om hasFlippedCard is false betyder att det är första
    //gången användaren har flippat ett kort
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  //andra klicket
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  //Kolla om de matchar
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //De matchar! disable/remove event listener
    disableCards();
    addMoves(); //////////////////// add moves function
  } else {
    //De matchar inte!
    //Flippa tillbaka korten med setTimeout så vi hinner se vad som händer.
    unFlicpCards();
    addMoves(); ////////////////// add moves function
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

//Funktion för att flippa tillbaka korten när de inte matchar.
function unFlicpCards() {
  lockBoard = true;
  setTimeout(function () {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false][(firstCard, secondCard)] = [
    null,
    null,
  ];
}

//Funktion som avfyras direkt och blandar korten.
(function shuffle() {
  cards.forEach(function (card) {
    let randomPos = Math.floor(Math.random() * 24);
    card.style.order = randomPos;
  });
})();

//Sätta eventlistener på alla kort så när de klickas kallas funktionen
//som vänder kortet
cards.forEach((card) => card.addEventListener("click", flipCard));

/************* MUHANNAD'S DEL PÅBÖRJAR **************/

document.querySelector(".control-button button").onclick = function () {
  const name = prompt("Whats your name?");

  if (name == null || name == "") {
    document.querySelector(".name .playerName").innerHTML = "Unknown";
  } else {
    document.querySelector(".name .playerName").innerHTML = name;
  }

  document.querySelector(".control-button").remove();
};

/************* TIMER FUNCTIONS START **************/

let clockId;
let clockOff = true;
let time = 0;

function displayTime() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const clock = document.querySelector(".clock");
  clock.innerHTML = time;
  if (seconds < 10) {
    clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
    clock.innerHTML = `${minutes}:${seconds}`;
  }
}

function startClock() {
  clockId = setInterval(function () {
    time++;
    displayTime();
  }, 1000);
}

function stopClock() {
  clearInterval(clockId);
  clockOff = true;
}

function resetTimer() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

/************* TIMER FUNCTIONS END **************/

/************* RESET FUNCTION START **************/

function reset() {
  resetTimer();
  resetMoves();
  resetShuffle();
}

document.querySelector(".reset-all").addEventListener("click", reset);

/************* RESET FUNCTION END **************/

/************* MOVES FUNCTIONS START **************/

let moves = 0;

function addMoves() {
  // count player's move when they open to cards
  moves++;
  const movesText = document.querySelector(".moves");
  movesText.innerHTML = moves;

  if (moves == 1) {
    startClock(); // Start time when the player do the first move
  }
}

function resetMoves() {
  // reset player's moves to 0
  moves = 0;
  document.querySelector(".moves").innerHTML = moves;
}

/************* MOVES FUNCTIONS END **************/

/************* MUHANNAD'S DEL SLUTAR **************/
