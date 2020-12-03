const KEY = "a2418e41e3338e1bc4c146d60794abd0";
let searchText = "cars";

const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=12&page=1`;

fetch(url)
  .then(function (response) {
    //console.log(response);
    return response.json();
  })
  .then(function (data) {
    // console.log(data.photos.photo);
    getImageUrl(data.photos.photo);
    /*     for (let i = 0; i < 12; i++) {
      console.log(data.photos.photo[i]);
      getImageUrl(data.photos.photo[i]);
    } //array med tolv element */
  });

//här ska vi pussla ihop bild urlen
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

//visa bildern
function setUrls(urls) {
  urls.push(...urls);
  console.log(urls); //tolv urler

  //Vi behöver de 24 img elementet med front-face klass
  //query select all - array med 24 element
  //loope igenom alla 24 elementen
  //om du dubblar alla urlerna så att du har en array med 24 st urler
  let frontFace = document.querySelectorAll(".front-face");
  console.log(frontFace);
  for (i = 0; i < urls.length; i++) {
    frontFace[i].src = urls[i];
  }
}

//

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
  } else {
    //De matchar inte!
    //Flippa tillbaka korten med setTimeout så vi hinner se vad som händer.
    unFlicpCards();
  }
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

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

(function shuffle() {
  cards.forEach(function (card) {
    let randomPos = Math.floor(Math.random() * 24);
    card.style.order = randomPos;
  });
})();

//Sätta eventlistener på alla kort så när de klickas kallas funktionen
//som vänder kortet
cards.forEach((card) => card.addEventListener("click", flipCard));
