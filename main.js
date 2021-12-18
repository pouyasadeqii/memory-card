// Grab a couple of things

const section = document.querySelector("section");
const text = document.querySelector("p");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

// link text

playerLivesCount.textContent = playerLives;

// generate the data

const getData = () => [
  { imgSrc: "./images/1.jpg", name: "buttle" },
  { imgSrc: "./images/2.jpg", name: "chair" },
  { imgSrc: "./images/3.jpg", name: "purple Sky" },
  { imgSrc: "./images/4.jpg", name: "city Night" },
  { imgSrc: "./images/5.jpg", name: "city Day" },
  { imgSrc: "./images/6.jpg", name: "car" },
  { imgSrc: "./images/7.jpg", name: "brige" },
  { imgSrc: "./images/8.jpg", name: "sunrise" },
  { imgSrc: "./images/1.jpg", name: "buttle" },
  { imgSrc: "./images/2.jpg", name: "chair" },
  { imgSrc: "./images/3.jpg", name: "purple Sky" },
  { imgSrc: "./images/4.jpg", name: "city Night" },
  { imgSrc: "./images/5.jpg", name: "city Day" },
  { imgSrc: "./images/6.jpg", name: "car" },
  { imgSrc: "./images/7.jpg", name: "brige" },
  { imgSrc: "./images/8.jpg", name: "sunrise" },
];

// Randomize

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  // console.log(cardData);
  return cardData;
};

// card generator function

const cardGenerator = () => {
  const cardData = randomize();
  // console.log(cardData);

  // generate the HTML


  cardData.forEach((item) => {
    // console.log(item);
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";

    // Attach the info to the cards

    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    // Attach the card to the section

    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

// check Cards

const checkCards = (e) => {
  const clickedCard = e.target;
  console.log(clickedCard);
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  //   logic

  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      console.log("match");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      console.log("wrong");
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => card.classList.remove("toggleCard"), 1000);
      });
      playerLives--;
      setTimeout(() => (playerLivesCount.textContent = playerLives), 1000);
      if (playerLives === 0) {
        setTimeout(restart("Try again..."), 3000);
        text.style.color = "red";
        text.innerText = "You Lose";
      }
    }
  }

  //   Run a check to see if we won the game

  if (toggleCard.length === 16) {
    setTimeout(restart("You Win"), 3000);
    text.style.color = "greenyellow";
    text.innerText = "***congrats***";
  }
};

// Restart

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    cards[index].classList.remove("toggleCard");

    // Randomize

    setTimeout(() => {
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
      resetText();
    }, 3000);
  });
  playerLives = 6;
  setTimeout(() => (playerLivesCount.textContent = playerLives), 3000);
  setTimeout(() => alert(text), 1000);
};

cardGenerator();


// reset text

const resetText = () => text.innerText = "";