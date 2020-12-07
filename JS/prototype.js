let cardArray = [];
let frontFaceNumb = 1;

// Fixa en konstruktor för korten
function Memorycard(_cards) {
  this.cards = _cards;
  this.div = document.createElement("div");
  this.div.className = "memory-card";
  this.frontFace = document.createElement("img");
  this.backFace = document.createElement("img");
  this.section = document.querySelector(".memory-game");
  this.div.appendChild(this.frontFace);
  this.div.appendChild(this.backFace);
  this.section.appendChild(this.div);
}

//Prototype för attribute/class name
Memorycard.prototype.divAttribute = function (attributeName, attributeValue) {
  this.div.setAttribute(attributeName, attributeValue);
};

Memorycard.prototype.frontFaceClass = function (className) {
  this.frontFace.className = className;
};

Memorycard.prototype.backFaceClass = function (className) {
  this.backFace.className = className;
};

Memorycard.prototype.backFaceSource = function (source) {
  this.backFace.src = source;
};

//Loopa ut kort
for (let j = 0; j < 2; j++) {
  // skapa 24 kort
  for (let i = 1; i <= 12; i++) {
    cardArray[i] = new Memorycard(i);

    cardArray[i].divAttribute("data-framework", i); //lägg till attributet data-framework för att kunna matcha kort.
    cardArray[i].frontFaceClass(
      "front-face pair-" + frontFaceNumb
    ); /* Lägg till class på framsidan av korten och för varje concatenate med  "frontFaceNumb" som kollar omtalet är jämt och i så fall ökar med 1 */
    cardArray[i].backFaceClass("back-face"); //Lägg till class på backsidan av korten
    cardArray[i].backFaceSource("../img/ufo-icon-vector.png"); //Lägg till bild för baksidan av korten.
    if (i % 2 === 0) {
      frontFaceNumb++;
    }
  }
}
