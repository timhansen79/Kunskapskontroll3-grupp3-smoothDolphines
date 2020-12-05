// Fixa en konstruktor för korten
function Card(_cards) {
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

Card.prototype.addDivAttribute = function (attributeName, attributeValue) {
  this.div.setAttribute(attributeName, attributeValue);
};

Card.prototype.addFrontFaceClass = function (className) {
  this.frontFace.className = className;
};

Card.prototype.addBackFaceClass = function (className) {
  this.backFace.className = className;
};

Card.prototype.addBackFaceSource = function (source) {
  this.backFace.src = source;
};

let cardArray = [];
let frontFaceNumb = 1;

for (let j = 0; j < 2; j++) {
  // här gör vi 2 stackar med 12 kort vardera
  for (let i = 1; i <= 12; i++) {
    cardArray[i] = new Card(i);

    cardArray[i].addDivAttribute("data-framework", i); //lägg till attributet data-framework för att kunna matcha kort.
    cardArray[i].addFrontFaceClass(
      "front-face pair-" + frontFaceNumb
    ); /* Lägg till class på framsidan av korten och för varje concatenate med  "frontFaceNumb" som kollar omtalet är jämt och i så fall ökar med 1 (%2==0) */
    cardArray[i].addBackFaceClass("back-face"); //Lägg till class på backsidan av korten
    cardArray[i].addBackFaceSource("../img/js-badge.svg"); //Lägg till bild för baksidan av korten.
    if (i % 2 === 0) {
      frontFaceNumb++;
    }
  }
}
