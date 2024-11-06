// Array of emoji cards, each with an ID, emoji, flip status, and alt text for accessibility
const emojiCards = [
    { id: 1, emoji: "🐱", flipped: true, alt: "cat" },
    { id: 2, emoji: "🐶", flipped: true, alt: "dog" },
    { id: 3, emoji: "🦄", flipped: true, alt: "unicorn" },
    { id: 4, emoji: "🐼", flipped: true, alt: "panda" },
    { id: 5, emoji: "🐸", flipped: true, alt: "frog" },
    { id: 6, emoji: "🐧", flipped: true, alt: "penguin" },
    { id: 7, emoji: "🐢", flipped: true, alt: "turtle" },
    { id: 8, emoji: "🦋", flipped: true, alt: "butterfly" },
    { id: 9, emoji: "🐙", flipped: true, alt: "octopus" },
    { id: 10, emoji: "🦊", flipped: true, alt: "fox" },
    { id: 11, emoji: "🦁", flipped: true, alt: "lion" },
    { id: 12, emoji: "🐮", flipped: true, alt: "cow" },
    { id: 13, emoji: "🐷", flipped: true, alt: "pig" },
    { id: 14, emoji: "🐹", flipped: true, alt: "hamster" },
    { id: 15, emoji: "🐤", flipped: true, alt: "chick" },
    { id: 16, emoji: "🐥", flipped: true, alt: "baby chick" },
    { id: 17, emoji: "😍", flipped: true, alt: "heart eyes" },
    { id: 18, emoji: "👻", flipped: true, alt: "ghost" },
    { id: 19, emoji: "🤖", flipped: true, alt: "robot" },
    { id: 20, emoji: "🐳", flipped: true, alt: "whale" },
    { id: 21, emoji: "🦉", flipped: true, alt: "owl" },
    { id: 22, emoji: "🐝", flipped: true, alt: "bee" },
    { id: 23, emoji: "🤑", flipped: true, alt: "money mouth" },
    { id: 24, emoji: "🐲", flipped: true, alt: "dragon" },
    { id: 25, emoji: "🐟", flipped: true, alt: "fish" },
    { id: 26, emoji: "🤡", flipped: true, alt: "clown" },
    { id: 27, emoji: "👹", flipped: true, alt: "ogre" },
    { id: 28, emoji: "🐾", flipped: true, alt: "paw prints" },
    { id: 29, emoji: "🐍", flipped: true, alt: "snake" },
    { id: 30, emoji: "🐛", flipped: true, alt: "bug" },
    { id: 31, emoji: "🍎", flipped: true, alt: "apple" },
    { id: 32, emoji: "🍌", flipped: true, alt: "banana" },
    { id: 33, emoji: "🍉", flipped: true, alt: "watermelon" },
    { id: 34, emoji: "🍓", flipped: true, alt: "strawberry" },
    { id: 35, emoji: "🍒", flipped: true, alt: "cherry" },
    { id: 36, emoji: "🍇", flipped: true, alt: "grapes" },
    { id: 37, emoji: "🍑", flipped: true, alt: "peach" },
    { id: 38, emoji: "🍩", flipped: true, alt: "donut" },
    { id: 39, emoji: "🍔", flipped: true, alt: "burger" },
    { id: 40, emoji: "🍕", flipped: true, alt: "pizza" },
    { id: 41, emoji: "🌮", flipped: true, alt: "taco" },
    { id: 42, emoji: "🍿", flipped: true, alt: "popcorn" },
    { id: 43, emoji: "🍪", flipped: true, alt: "cookie" },
    { id: 44, emoji: "🍙", flipped: true, alt: "rice ball" },
    { id: 45, emoji: "🍭", flipped: true, alt: "lollipop" },
    { id: 46, emoji: "🍫", flipped: true, alt: "chocolate" },
    { id: 47, emoji: "🍬", flipped: true, alt: "candy" },
    { id: 48, emoji: "🍧", flipped: true, alt: "shaved ice" },
    { id: 49, emoji: "🍨", flipped: true, alt: "ice cream" },
    { id: 50, emoji: "🍰", flipped: true, alt: "cake" }
];

// Game state variables
let flippedCards = []; // Stores currently flipped cards
let matchedPairs = 0;  // Counts the number of matched pairs
let CARD_PAIR_COUNT = 10; // Number of card pairs based on selected level
let level = ""; // Current difficulty level

// SFX
const winSfx = document.getElementById("win-sfx");

// Function to shuffle an array of cards randomly
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to prepare a specific number of card pairs for the game
function prepareCards(pairCount) {
    const gameCards = [];

    for (let i = 0; i < pairCount; i++) {
        const emoji = emojiCards[i].emoji;
        // Create two cards with the same emoji to form a pair
        gameCards.push({ id: i * 2, pairId: i, emoji: emoji, flipped: false });
        gameCards.push({ id: i * 2 + 1, pairId: i, emoji: emoji, flipped: false });
    }
    return shuffleCards(gameCards);
}

// Function to create a card element in HTML
function createCardElement(card) {
    const cardElement = document.createElement("div");
    cardElement.className = "flip-card";
    cardElement.id = `card-${card.id}`;

    cardElement.innerHTML = `
        <div class="flip-card-inner">
            <div class="flip-card-back"></div>
            <div class="flip-card-front">
                <div class="content">${card.emoji}</div>
            </div>
        </div>
    `;

    // Menambahkan event listener untuk kartu
    cardElement.addEventListener("click", () => handleCardClick(card, cardElement));

    return cardElement;
}

// Handles card click events for flipping cards and checking matches
function handleCardClick(card, cardElement) {
    // Mengabaikan klik jika kartu sudah terbuka atau sedang dalam proses pengecekan
    if (card.flipped || flippedCards.length >= 2) return;

    // Flip the card and add it to flippedCards array
    card.flipped = true;
    cardElement.classList.add("flipped");
    flippedCards.push({ card, element: cardElement });

    // Check for a match if two cards are flipped
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Display elements to show end-game or time information
const finishedGameDisplay = document.querySelector(".finished-game-container");
const chosenLevel = document.querySelector("#level");
const timeSpent = document.querySelector("#time-spent");
const timeVar = document.querySelector("#timer");

// Checks if flipped cards match and updates game state accordingly
function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    const isMatch = firstCard.card.pairId === secondCard.card.pairId;

    if (isMatch) {
        // Kartu cocok
        matchedPairs++;
        flippedCards = [];

        // Cek apakah permainan selesai
        if (matchedPairs === CARD_PAIR_COUNT) {
            setTimeout(() => {
                finishedGameDisplay.style.display = "flex";
            }, 500);
            pauseTimer();
            chosenLevel.textContent = level;
            timeSpent.textContent = timeVar.textContent;

            winSfx.play()
        }
    } else {
        // Unflip unmatched cards
        setTimeout(() => {
            firstCard.element.classList.remove("flipped");
            secondCard.element.classList.remove("flipped");
            firstCard.card.flipped = false;
            secondCard.card.flipped = false;
            flippedCards = [];
        }, 700);
    }
}

// Initializes the game by setting up cards and starting the timer
function initGame() {
    matchedPairs = 0;
    startTimer();
    const cardContainer = document.querySelector(".main-container");
    cardContainer.innerHTML = ""; // Bersihkan container

    // Siapkan dan acak kartu
    const gameCards = prepareCards(CARD_PAIR_COUNT);

    // Hitung jumlah kolom optimal berdasarkan jumlah kartu
    const totalCards = window.innerWidth > 480 ? gameCards.length : (gameCards.length) / 2;
    const optimalColumns = Math.ceil(Math.sqrt(totalCards));

    // Terapkan grid template ke container
    cardContainer.style.gridTemplateColumns = `repeat(${optimalColumns}, 1fr)`;

    // Tampilkan kartu di container
    gameCards.forEach(card => {
        cardContainer.appendChild(createCardElement(card));
    });
}

// Resizes cards to fit dynamically in the container
function resizeCards() {
    const container = document.querySelector(".main-container");
    const cards = document.querySelectorAll(".flip-card");

    // Dapatkan ukuran container
    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    // Hitung jumlah kolom dari grid yang sudah diatur
    const computedStyle = window.getComputedStyle(container);
    const columns = computedStyle.gridTemplateColumns.split(" ").length;

    // Hitung ukuran optimal untuk kartu
    const gap = 10; // gap antara kartu
    const optimalWidth = (containerWidth / columns) - (gap * 2);
    const aspectRatio = 1; // untuk kartu persegi

    // Terapkan ukuran ke semua kartu
    cards.forEach(card => {
        card.style.width = `${optimalWidth}px`;
        card.style.height = `${optimalWidth * aspectRatio}px`;
    });
}

// Panggil resizeCards saat window di-resize
window.addEventListener('resize', resizeCards);

// Timer and level-related variables and functions
var hours = 0;
var mins = 0;
var seconds = 0;

const sec = document.getElementById("seconds");
const min = document.getElementById("mins");
const hou = document.getElementById("hours");

const continueMenu = document.querySelector(".continue-game");
const contButton = document.getElementById("continue");
const reButton = document.querySelectorAll(".restart-button");

function pauseTimer() {
    clearTimeout(timex);
}
document.getElementById("pause").addEventListener("click", () => {
    pauseTimer();
    continueMenu.style.display = "flex"
})

contButton.addEventListener("click", () => {
    continueMenu.style.display = "none"
    startTimer();
})

for (let i = 0; i < reButton.length; i++) {
    reButton[i].addEventListener("click", () => {
        pauseTimer();
        gameStart.style.display = "flex";
        continueMenu.style.display = "none";
        finishedGameDisplay.style.display = "none"
    })
}

function resetTimer() {
    hours = 0; mins = 0; seconds = 0;
    hou.textContent = '00:';
    min.textContent = '00:';
    sec.textContent = '00';
}


function startTimer() {
    timex = setTimeout(function () {
        seconds++;
        if (seconds > 59) {
            seconds = 0; mins++;
            if (mins > 59) {
                mins = 0; hours++;
                if (hours < 10) { hou.textContent = `0 ${hours}:` } else hou.textContent = hours + ':';
            }

            if (mins < 10) {
                min.textContent = '0' + mins + ':'
            }
            else { min.textContent = mins + ':' }
        }
        if (seconds < 10) {
            sec.textContent = '0' + seconds
        } else {
            sec.textContent = seconds;
        }


        startTimer();
    }, 1000);
}


// Initialize game difficulty levels
const gameStart = document.querySelector(".game-start");
document.getElementById("easy").addEventListener("click", () => {
    level = "EASY"; gameStart.style.display = "none"; CARD_PAIR_COUNT = 10;
    resetTimer(); initGame(); resizeCards();
});
document.getElementById("medium").addEventListener("click", () => {
    level = "MEDIUM"; gameStart.style.display = "none"; CARD_PAIR_COUNT = 20;
    resetTimer(); initGame(); resizeCards();
});
document.getElementById("hard").addEventListener("click", () => {
    level = "HARD"; gameStart.style.display = "none"; CARD_PAIR_COUNT = 36;
    resetTimer(); initGame(); resizeCards();
});
document.getElementById("extreme").addEventListener("click", () => {
    level = "EXTREME"; gameStart.style.display = "none"; CARD_PAIR_COUNT = 49;
    resetTimer(); initGame(); resizeCards();
});