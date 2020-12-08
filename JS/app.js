const KEY = "a2418e41e3338e1bc4c146d60794abd0";
let searchText = "UFO";

const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=12&page=1&sort=relevance`;

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
    addMoves(); //////////////////// add moves function/Muhannad
    scoreRating(); /////////////// Add score function/Muhannad
  } else {
    //De matchar inte!
    //Flippa tillbaka korten med setTimeout så vi hinner se vad som händer.
    unFlicpCards();
    addMoves(); ////////////////// add moves function/Muhannad
    losingPoints(); /////////////// Add losingPoints funktion/Muhannad
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

// Skapa en kod som frågar spelarens namn och visar den, om spelaren inte skrev namnet så visas ett namn som "Unknown"

document.querySelector(".control-button button").onclick = function () {
  const name = prompt("Whats your name?");

  if (name == null || name == "") {
    document.querySelector(".name .playerName").innerHTML = "Unknown";
  } else {
    document.querySelector(".name .playerName").innerHTML = name;
  }

  document.querySelector(".control-button").remove();
};

function resetGame() {
  // Skapa en funktion som laddar om sidan när spelaren klickar på startknappen
  window.location.reload();
}

/************* TIMER FUNCTIONS START **************/

let clockId;
let clockOff = true;
let time = 0;

function displayTime() {
  // Skapa en funktion som visar tiden i sekunder och minuter
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

console.log(time);

function startClock() {
  // Skapa en funktion som börjar räkna ut tiden
  clockId = setInterval(function () {
    time++;
    displayTime();
  }, 1000);
}

function stopClock() {
  // Skapa en funktion som stoppar räkna ut tiden
  clearInterval(clockId);
  clockOff = true;
}

function resetTimer() {
  // Skapa en funktion som reset tiden till 0
  stopClock();
  clockOff = true;
  time = 0;
  displayTime();
}

/************* TIMER FUNCTIONS END **************/

/************* RESET FUNCTION START **************/

// Skapa och lägg till en eventlyssnare till återställningsfunktionen som innehåller alla återställningsfunktioner som vi skapade

function reset() {
  resetTimer();
  resetMoves();
  resetShuffle();
  resetGame();
  resetScore();
}

document.querySelector(".reset-all").addEventListener("click", reset);

/************* RESET FUNCTION END **************/

/************* MOVES FUNCTIONS START **************/

let moves = 0;

function addMoves() {
  // Räkna spelarens drag när hen öppnar korten
  moves++;
  const movesText = document.querySelector(".moves");
  movesText.innerHTML = moves;

  if (moves == 1) {
    startClock(); // Starttid när spelaren gör det första drag
  }
}

function resetMoves() {
  // återställ spelarens drag till 0
  moves = 0;
  document.querySelector(".moves").innerHTML = moves;
}

/************* MOVES FUNCTIONS END **************/

/************* RESET SHUFFLE START ***************/

// Skapa en funktion som blandar om korten när spelaren klickar på återställningsknappen

function resetShuffle() {
  cards.forEach(function (card) {
    let randomPos = Math.floor(Math.random() * 24);
    card.style.order = randomPos;
  });
}

/************* RESET SHUFFLE END ***************/

/************* WIN FUNCTIONS START **************/

// Skapa en funktion som dyker upp ett gratulationsmeddelande när spelaren matchade alla kort

cards.forEach(function (card) {
  card.addEventListener("click", function () {
    let allmatched = document.getElementsByClassName("flip");
    if (allmatched.length == 24) {
      setTimeout(function () {
        stopClock();
        alert(
          `Congratulations! 🎉 \nYou Made (${moves}) Moves In (${time}) Sec .. Your Score Is (${score}) Point\nClikck "Ok" To Play Again!`
        );
        window.location.reload();
      }, 200);
    }
  });
});

/************* WIN FUNCTIONS END **************/

/************* SCORE FUNCTIONS START **************/

let playerScore = document.querySelector(".score");

let score = 0;

function scoreRating() {
  // Skapa en funktion som lägger till 3 poäng om korten matchas

  if (
    moves == 5 ||
    moves == 10 ||
    moves == 15 ||
    moves == 20 ||
    moves == 25 ||
    moves == 30 ||
    moves == 35 ||
    moves == 40 ||
    moves == 45 ||
    moves == 50 ||
    moves == 55 ||
    moves == 60 ||
    moves == 65 ||
    moves == 70 ||
    moves == 75 ||
    moves == 80 ||
    moves == 85 ||
    moves == 90 ||
    moves == 95 ||
    moves == 100
  ) {
    score -= 1;
  }

  score += 3;

  playerScore.innerHTML = score;
}

function losingPoints() {
  // Skapa en funktion som tar bort en poäng för varje 5 drag

  if (
    moves == 5 ||
    moves == 10 ||
    moves == 15 ||
    moves == 20 ||
    moves == 25 ||
    moves == 30 ||
    moves == 35 ||
    moves == 40 ||
    moves == 45 ||
    moves == 50 ||
    moves == 55 ||
    moves == 60 ||
    moves == 65 ||
    moves == 70 ||
    moves == 75 ||
    moves == 80 ||
    moves == 85 ||
    moves == 90 ||
    moves == 95 ||
    moves == 100
  ) {
    score -= 1;
    playerScore.innerHTML = score;
  }
}

function resetScore() {
  // Skapa en funktion som reset poäng till 0
  score = 0;
  playerScore.innerHTML = score;
}

/************* SCORE FUNCTIONS END **************/

/************* MUHANNAD'S DEL SLUTAR **************/
